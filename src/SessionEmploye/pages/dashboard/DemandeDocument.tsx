// ../SessionEmploye/pages/dashboard/DemandeDocument.tsx
import React, { useState } from 'react';
import { TextField, Button, Card, MenuItem } from '@mui/material';

const DemandeDocument: React.FC = () => {
  const [documentType, setDocumentType] = useState('');
  const [motif, setMotif] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const demandeData = {
      type: documentType,
      motif: motif,
    };

    console.log('✅ Demande envoyée :', demandeData);

    // Ici tu pourras appeler ton API backend avec axios/fetch
    // axios.post("/api/employee/demandes/document", demandeData)
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Demande de Document</h2>

      <Card style={{ padding: '1.5rem', maxWidth: '500px' }}>
        <form onSubmit={handleSubmit}>
          {/* Sélection du type de document */}
          <TextField
            select
            label="Type de document"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="certificat-travail">Certificat de travail</MenuItem>
            <MenuItem value="fiche-paie">Fiche de paie</MenuItem>
            <MenuItem value="autre">Autre</MenuItem>
          </TextField>

          {/* Motif */}
          <TextField
            label="Motif"
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          {/* Bouton d'envoi */}
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
            Envoyer la demande
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default DemandeDocument;
