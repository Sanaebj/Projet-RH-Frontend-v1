import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';

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
      setDemandes((prev) =>
        prev.map((d) => (d.id === id ? { ...d, documentPret: true } : d))
      );
    } catch (error) {
      console.error('Erreur mise à jour :', error);
    }
  };

  return (
      <>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Liste des demandes de documents</Typography>
        </Box>
    <TableContainer component={Paper} sx={{ maxWidth: 1400,margin: 'auto', mt: 4, p: 2 }}>
      <Table aria-label="liste des demandes">
        <TableHead>
          <TableRow>
            <TableCell>Employé</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Commentaire</TableCell>
            <TableCell>État</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {demandes.map((demande) => (
            <TableRow key={demande.id}>
              <TableCell>
                {demande.employe
                  ? `${demande.employe.nom} ${demande.employe.prenom}`
                  : 'Employé inconnu'}
              </TableCell>
              <TableCell>{demande.type}</TableCell>
              <TableCell>{demande.dateDemande}</TableCell>
              <TableCell>{demande.commentaire || '-'}</TableCell>
              <TableCell>{demande.documentPret ? '✅ Prêt' : '⏳ En attente'}</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
  );
};

export default ListeDemandes;
