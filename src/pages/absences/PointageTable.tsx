import React, { useEffect, useState } from 'react';
import { PointageJour } from '../../types/PointageJour';
import { Box, Typography } from '@mui/material';
import axiosInstance from '../../services/axiosInstance';

const PointageTable: React.FC = () => {
  const [pointages, setPointages] = useState<PointageJour[]>([]);
  const [loading ] = useState<boolean>(true);

  useEffect(() => {
    axiosInstance
      .get<PointageJour[]>('/pointage/jour')
      .then((res) => {
        setPointages(res.data); // res.data est maintenant reconnu comme PointageJour[]
      })
      .catch((err) => {
        console.error("Erreur chargement pointages:", err);
      });
  }, []);
  
  if (loading) {
    return (
      <Typography variant="body1" color="textSecondary">
        Chargement en cours...
      </Typography>
    );
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">📝 Pointage Journalier</Typography>
      </Box>

      <div className="card mt-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover custom-table">
              <thead>
                <tr>
                  <th>Employé</th>
                  <th>Entrée</th>
                  <th>Sortie</th>
                  <th>Retard</th>
                </tr>
              </thead>
              <tbody>
                {pointages.length > 0 ? (
                  pointages.map((p, index) => (
                    <tr key={index}>
                      <td>{p.nomComplet}</td>
                      <td>{p.heureEntree || '--'}</td>
                      <td>{p.heureSortie || '--'}</td>
                      <td
                        style={{
                          color: p.retard.includes('🔴') ? 'red' : 'green',
                          fontWeight: 'bold',
                        }}
                      >
                        {p.retard}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      Aucun pointage trouvé pour aujourd'hui.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PointageTable;
