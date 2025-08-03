import { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface User {
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

// Type-safe Axios error check
function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/auth/signin', { replace: true });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response: AxiosResponse<User> = await axiosInstance.get('/users/me');
        setUser(response.data);
        setError(null);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          if (err.response?.status === 401 || err.response?.status === 403) {
            localStorage.removeItem('token');
            setError('Session expirée. Veuillez vous reconnecter.');
            redirectToLogin();
          } else {
            setError(err.message);
          }
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erreur inconnue');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);


  if (loading) {
    return (
      <Box mt={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Box mt={4} textAlign="center">
          <Typography variant="h6" color="error" gutterBottom>
            {error}
          </Typography>
          <Button variant="contained" color="primary" onClick={redirectToLogin}>
            Se connecter
          </Button>
        </Box>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Box mt={4} textAlign="center">
          <Typography variant="h6" color="error">
            Impossible de charger le profil utilisateur.
          </Typography>
          <Button variant="contained" color="primary" onClick={redirectToLogin}>
            Se connecter
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Mon Profil
        </Typography>
        <Typography variant="body1">
          Nom : {user.nom} {user.prenom}
        </Typography>
        <Typography variant="body1">Email : {user.email}</Typography>
        <Typography variant="body1">Rôle : {user.role}</Typography>
      </Box>
    </Container>
  );
};

export default Profile;