import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getAllEmployes, 
  deleteEmploye 
} from '../../services/employe.service';
import { Employe } from '../../types/Employe';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EmployeList = () => {
  const [employes, setEmployes] = useState<Employe[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEmployeId, setSelectedEmployeId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployes();
  }, []);

  const loadEmployes = async () => {
    try {
      const data = await getAllEmployes();
      setEmployes(data);
    } catch (err) {
      console.error('Error loading employees:', err);
    }
  };

  const handleCreate = () => {
    navigate('/employes/add');
  };

  const handleEdit = (id: number) => {
    navigate(`/employes/edit/${id}`);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedEmployeId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedEmployeId) {
      try {
        await deleteEmploye(selectedEmployeId);
        await loadEmployes();
      } catch (err) {
        console.error('Error deleting employee:', err);
      } finally {
        setOpenDeleteDialog(false);
      }
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setSelectedEmployeId(null);
  };

  const headerCellStyle = {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottom: 'none',
  };

  const actionCellStyle = {
    textAlign: 'center',
    width: '120px',
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Liste des employés</Typography>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          + Créer un employé
        </Button>
      </Box>

      <TableContainer component={Paper}>
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
              <TableCell sx={headerCellStyle}>Matricule</TableCell>
              <TableCell sx={headerCellStyle}>Nom</TableCell>
              <TableCell sx={headerCellStyle}>Prénom</TableCell>
              <TableCell sx={headerCellStyle}>CIN</TableCell>
              <TableCell sx={headerCellStyle}>Poste</TableCell>
              <TableCell sx={headerCellStyle}>Service</TableCell>
              <TableCell sx={headerCellStyle}>Email</TableCell>
              <TableCell sx={headerCellStyle}>Salaire</TableCell>
              <TableCell sx={{ ...headerCellStyle, ...actionCellStyle }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employes.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.matricule}</TableCell>
                <TableCell>{emp.nom}</TableCell>
                <TableCell>{emp.prenom}</TableCell>
                <TableCell>{emp.cin}</TableCell>
                <TableCell>{emp.poste}</TableCell>
                <TableCell>{emp.service}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.salaire} DH</TableCell>
                <TableCell sx={actionCellStyle}>
                  <IconButton 
                    color="primary" 
                    onClick={() => emp.id && handleEdit(emp.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => emp.id && handleDeleteClick(emp.id)}
                  >
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
        <DialogTitle id="alert-dialog-title">Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer cet employé ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeList;