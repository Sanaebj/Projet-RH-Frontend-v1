import { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SpentChart from './SpentChart';

const Spent = () => {
  const [employeCount, setEmployeCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    setLoading(true);  // démarre le chargement
  
    axios.get<number>("http://localhost:2233/api/employes/count", {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    })
    .then(response => {
        setEmployeCount(response.data);
        setError("");
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération du nombre d'employés", err);
        setError("Impossible de charger le nombre d'employés.");
        setLoading(false);
      });
  }, []);
  
  

  return (
    <Paper component={Stack} alignItems="center" justifyContent="space-between" sx={{ py: 2.5 }}>
      <Box>
        <Typography variant="body2" color="text.disabled" fontWeight={500}>
          Employée Actifs
        </Typography>
        <Typography mt={1} variant="h3">
          {loading ? "Chargement..." : error ? error : employeCount}
        </Typography>
      </Box>

      <SpentChart data={[160, 100, 210, 270, 180]} sx={{ width: 75, height: '68px !important' }} />
    </Paper>
  );
};

export default Spent;
