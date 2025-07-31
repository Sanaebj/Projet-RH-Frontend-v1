import { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface User {
  nom: string;
  prenom: string;
  email: string;
  role: string;
}
const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/auth/signin', { replace: true });
  };

const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token'); // déclare et récupère le token en premier
    console.log("Token brut:", token);
  
    if (token) {
      const payload = parseJwt(token);
      console.log("Payload du token:", payload);
    }
  
    if (!token) {
      setError('Vous devez être connecté pour accéder au profil.');
      setLoading(false);
      return;
    }
  
    fetch('http://localhost:2233/api/users/me', {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        console.log("Status:", res.status);
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            console.log("Token invalide ou expiré, redirection vers login");
            localStorage.removeItem('token');
            redirectToLogin();
            throw new Error(`Accès refusé (${res.status}). Vous devez vous reconnecter.`);
          }
          const errorText = await res.text();
          throw new Error(`Erreur HTTP ${res.status} : ${errorText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Données utilisateur reçues:", data);
        setUser(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Erreur:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
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
