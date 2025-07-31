import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEmployes } from '../../services/employe.service';
import { Employe } from '../../types/Employe';
import { Box, Button, Typography } from '@mui/material';

const EmployeList: React.FC = () => {
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
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Liste des employés</Typography>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          + Créer un employé
        </Button>
      </Box>

      <div className="card mt-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover custom-table">
              <thead>
                <tr>
                  <th>Matricule</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Poste</th>
                  <th>Service</th>
                  <th>Email</th>
                  <th>Salaire</th>
                </tr>
              </thead>
              <tbody>
                {employes.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.matricule}</td>
                    <td>{emp.nom}</td>
                    <td>{emp.prenom}</td>
                    <td>{emp.poste}</td>
                    <td>{emp.service}</td>
                    <td>{emp.email}</td>
                    <td>{emp.salaire} DH</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeList;
