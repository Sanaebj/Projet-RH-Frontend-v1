import  { useEffect, useState } from 'react';
import axiosInstance from '../../../../../services/axiosInstance';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';

const Earnings = () => {
  const [nombreDemandes, setNombreDemandes] = useState<number>(0);

  useEffect(() => {
    axiosInstance
      .get<number>('/demandes-documents/count/en-cours') // <-- Ici le <number>
      .then(response => {
        setNombreDemandes(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération du nombre de demandes :", error);
      });
  }, []);

  return (
    <Paper
      component={Stack}
      alignItems="center"
      justifyContent="space-between"
      sx={{ px: 2, py: 3 }}
    >
      <Stack alignItems="center" justifyContent="flex-start" spacing={2}>
        <Stack
          alignItems="center"
          justifyContent="center"
          height={56}
          width={56}
          bgcolor="info.main"
          borderRadius="50%"
        >
          <IconifyIcon icon="ic:round-bar-chart" color="primary.main" fontSize="h3.fontSize" />
        </Stack>
        <Box>
          <Typography variant="body2" color="text.disabled" fontWeight={500}>
            Demandes RH
          </Typography>
          <Typography mt={1} variant="h3">
            {nombreDemandes} 
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default Earnings;
