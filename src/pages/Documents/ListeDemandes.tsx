import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';

interface Employe {
  id: number;
  nom: string;
  prenom: string;
}

interface DemandeDocument {
  id: number;
  type: string;
  dateDemande: string;
  documentPret: boolean;
  commentaire: string;
  employe: Employe | null;
}

const ListeDemandes: React.FC = () => {
  const [demandes, setDemandes] = useState<DemandeDocument[]>([]);

  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = async () => {
    try {
      const res = await axios.get<DemandeDocument[]>('http://localhost:2233/api/demandes-documents');
      setDemandes(res.data);
    } catch (error) {
      console.error('Erreur lors du chargement des demandes :', error);
    }
  };

  const marquerCommePret = async (id: number) => {
    try {
      await axios.put(`http://localhost:2233/api/demandes-documents/${id}/valider`);
      setDemandes(prev =>
        prev.map(d => (d.id === id ? { ...d, documentPret: true } : d))
      );
    } catch (error) {
      console.error('Erreur mise à jour :', error);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">📄 Liste des demandes de documents</Typography>
        {/* Ici tu peux ajouter un bouton si besoin, par exemple pour ajouter une demande */}
      </Box>

      <div className="card mt-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover custom-table">
              <thead>
                <tr>
                  <th>Employé</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Commentaire</th>
                  <th>État</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {demandes.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center' }}>
                      Aucune demande trouvée
                    </td>
                  </tr>
                ) : (
                  demandes.map((demande) => (
                    <tr key={demande.id}>
                      <td>
                        {demande.employe
                          ? `${demande.employe.nom} ${demande.employe.prenom}`
                          : 'Employé inconnu'}
                      </td>
                      <td>{demande.type}</td>
                      <td>{new Date(demande.dateDemande).toLocaleDateString('fr-FR')}</td>
                      <td>{demande.commentaire || '-'}</td>
                      <td>{demande.documentPret ? '✅ Prêt' : '⏳ En attente'}</td>
                      <td>
                        {!demande.documentPret && (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => marquerCommePret(demande.id)}
                          >
                            Marquer comme prêt
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListeDemandes;
