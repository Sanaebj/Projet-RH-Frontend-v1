import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEmployes } from '../../services/employe.service';
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
} from '@mui/material';

const EmployeList = () => {
  const [employes, setEmployes] = useState<Employe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployes()
      .then((data) => setEmployes(data))
      .catch((err) => console.error(err));
  }, []);

  const handleCreate = () => {
    navigate('/employes/add');
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Liste des employés</Typography>
        <Button variant="contained" color="primary" onClick={handleCreate}>
        +  Créer un employé
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Matricule</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Poste</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Salaire</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employes.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.matricule}</TableCell>
                <TableCell>{emp.nom}</TableCell>
                <TableCell>{emp.prenom}</TableCell>
                <TableCell>{emp.poste}</TableCell>
                <TableCell>{emp.service}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.salaire} DH</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeList;
