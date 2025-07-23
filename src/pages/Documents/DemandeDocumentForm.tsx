import React, { useState } from 'react';
import axios from 'axios';

interface DemandeDocumentFormProps {
  employeId: number;
}

// Définition enum pour le type de document
export enum DocumentType {
  TRAVAIL = 'TRAVAIL',
  SALAIRE = 'SALAIRE',
  STAGE = 'STAGE',
}

// Interface pour la structure des données envoyées au backend
interface DemandePayload {
  type: DocumentType;
  commentaire: string;
  employe: { id: number };
}

const DemandeDocumentForm: React.FC<DemandeDocumentFormProps> = ({ employeId }) => {
  const [type, setType] = useState<DocumentType>(DocumentType.TRAVAIL);
  const [commentaire, setCommentaire] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: DemandePayload = {
      type,
      commentaire,
      employe: { id: employeId },
    };

    try {
      await axios.post('http://localhost:2233/api/demandes-documents', payload);
      alert('Demande envoyée avec succès !');
      setCommentaire('');
    } catch (error) {
      console.error('Erreur lors de la demande :', error);
      alert('Erreur lors de l’envoi de la demande.');
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as DocumentType);
  };

  return (
    <div>
      <h2>Demander un document administratif</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Type de document :</label>
          <select value={type} onChange={handleTypeChange}>
            <option value={DocumentType.TRAVAIL}>Attestation de travail</option>
            <option value={DocumentType.SALAIRE}>Attestation de salaire</option>
            <option value={DocumentType.STAGE}>Attestation de stage</option>
          </select>
        </div>

        <div>
          <label>Commentaire :</label><br />
          <textarea
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            rows={4}
            cols={40}
          />
        </div>

        <button type="submit">Envoyer la demande</button>
      </form>
    </div>
  );
};

export default DemandeDocumentForm;
