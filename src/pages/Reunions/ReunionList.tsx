import React, { useEffect, useState } from 'react';
import { Reunion } from '../../types/Reunion';
import { getAllReunions, deleteReunion } from '../../services/reunionService';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useNavigate } from 'react-router-dom';

const ReunionList: React.FC = () => {
  const [reunions, setReunions] = useState<Reunion[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedReunionId, setSelectedReunionId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllReunions();
        setReunions(data);
      } catch (error) {
        console.error('Erreur lors du chargement des réunions :', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = (id: number) => {
    setSelectedReunionId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setSelectedReunionId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedReunionId) return;

    try {
      await deleteReunion(selectedReunionId);
      setReunions(prev => prev.filter(r => r.id !== selectedReunionId));
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    } finally {
      setOpenDeleteDialog(false);
      setSelectedReunionId(null);
    }
  };

  const handleCreate = () => {
    navigate('/reunions/add');
  };

  const headerCellStyle = {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottom: 'none',
  };

  const actionCellStyle = {
    textAlign: 'center',
    width: '80px',
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">📅 Liste des Réunions</Typography>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          + Créer une réunion
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ maxWidth: 1400, margin: 'auto', mt: 4, p: 2 }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#4f46e5',
                '& th:first-of-type': {
                  borderTopLeftRadius: '12px',
                  borderBottomLeftRadius: '12px',
                },
                '& th:last-of-type': {
                  borderTopRightRadius: '12px',
                  borderBottomRightRadius: '12px',
                },
              }}
            >
              <TableCell sx={headerCellStyle}>Titre</TableCell>
              <TableCell sx={headerCellStyle}>Date et Heure</TableCell>
              <TableCell sx={headerCellStyle}>Lieu</TableCell>
              <TableCell sx={headerCellStyle}>Description</TableCell>
              <TableCell sx={headerCellStyle}>Participants</TableCell>
              <TableCell sx={{ ...headerCellStyle, ...actionCellStyle }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {reunions.map((reunion) => (
              <TableRow key={reunion.id}>
                <TableCell>{reunion.titre}</TableCell>
                <TableCell>{new Date(reunion.dateHeure).toLocaleString('fr-FR')}</TableCell>
                <TableCell>{reunion.lieu}</TableCell>
                <TableCell>{reunion.description}</TableCell>
                <TableCell>
                  {reunion.participations && reunion.participations.length > 0 ? (
                    <ul style={{ paddingLeft: 16, margin: 0 }}>
                      {reunion.participations.map((p) => (
                        <li key={p.id}>
                          {p.employe.prenom} {p.employe.nom}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <em>Aucun</em>
                  )}
                </TableCell>
                <TableCell sx={actionCellStyle}>
                  <IconButton color="error" onClick={() => handleDeleteClick(reunion.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: '#1976d2', display: 'flex', alignItems: 'center' }}>
          <WarningAmberIcon sx={{ marginRight: 1, color: '#1976d2' }} />
          Confirmer la suppression
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer cette réunion ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: '16px' }}>
          <Button onClick={handleDeleteCancel} sx={{ color: '#1976d2' }}>
            Annuler
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReunionList;
