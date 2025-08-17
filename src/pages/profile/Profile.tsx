import { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Button, Card, CardContent, Avatar, Stack, Divider, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import { AxiosError, AxiosResponse } from 'axios';

interface User {
  nom: string;
  prenom: string;
  email: string;
  role: string;
  dateNaissance?: string;
  telephone?: string;
  departement?: string;
  poste?: string;
  adresse?: string;
  ville?: string;
  pays?: string;
  // ajoute d'autres champs si nécessaire
}

function isAxiosError(error: unknown): error is AxiosError {
  return (
    error instanceof AxiosError ||
    (typeof error === 'object' && error !== null && 'isAxiosError' in error && (error as { isAxiosError?: boolean }).isAxiosError === true)
  );
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const redirectToLogin = () => navigate('/auth/signin', { replace: true });

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

  if (loading) return <Box mt={8} textAlign="center"><CircularProgress /></Box>;

  if (error)
    return (
      <Container>
        <Box mt={8} textAlign="center">
          <Typography variant="h6" color="error" gutterBottom>{error}</Typography>
          <Button variant="contained" color="primary" onClick={redirectToLogin}>Se connecter</Button>
        </Box>
      </Container>
    );

  if (!user)
    return (
      <Container>
        <Box mt={8} textAlign="center">
          <Typography variant="h6" color="error">Impossible de charger le profil utilisateur.</Typography>
          <Button variant="contained" color="primary" onClick={redirectToLogin}>Se connecter</Button>
        </Box>
      </Container>
    );

  return (
    <Container maxWidth="md">
      <Box mt={8}>
        <Card sx={{ borderRadius: 4, boxShadow: 6, p: 3 }}>
          <CardContent>
            {/* Avatar et Nom */}
            <Box display="flex" justifyContent="center" mb={3}>
              <Avatar
                sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: 40 }}
              >
                {user.nom.charAt(0)}{user.prenom.charAt(0)}
              </Avatar>
            </Box>

            <Stack spacing={1} alignItems="center" textAlign="center" mb={3}>
              <Typography variant="h5" fontWeight={600}>
                {user.nom} {user.prenom}
              </Typography>
              <Typography variant="body1" color="text.secondary">{user.email}</Typography>
              <Typography variant="body2" sx={{ bgcolor: 'primary.light', px: 2, py: 0.5, borderRadius: 2, fontWeight: 500 }}>
                {user.role}
              </Typography>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Informations organisées en deux colonnes */}
            <Grid container spacing={3}>
              {/* Colonne gauche */}
              <Grid item xs={12} sm={6}>
                {user.dateNaissance && (
                  <Box mb={2}>
                    <Typography variant="subtitle2" color="text.secondary">Date de naissance</Typography>
                    <Typography variant="body1">{user.dateNaissance}</Typography>
                  </Box>
                )}
                {user.telephone && (
                  <Box mb={2}>
                    <Typography variant="subtitle2" color="text.secondary">Téléphone</Typography>
                    <Typography variant="body1">{user.telephone}</Typography>
                  </Box>
                )}
                {user.adresse && (
                  <Box mb={2}>
                    <Typography variant="subtitle2" color="text.secondary">Adresse</Typography>
                    <Typography variant="body1">{user.adresse}</Typography>
                  </Box>
                )}
              </Grid>

              {/* Colonne droite */}
              <Grid item xs={12} sm={6}>
                {user.departement && (
                  <Box mb={2}>
                    <Typography variant="subtitle2" color="text.secondary">Département</Typography>
                    <Typography variant="body1">{user.departement}</Typography>
                  </Box>
                )}
                {user.poste && (
                  <Box mb={2}>
                    <Typography variant="subtitle2" color="text.secondary">Poste</Typography>
                    <Typography variant="body1">{user.poste}</Typography>
                  </Box>
                )}
                {user.ville && (
                  <Box mb={2}>
                    <Typography variant="subtitle2" color="text.secondary">Ville</Typography>
                    <Typography variant="body1">{user.ville}</Typography>
                  </Box>
                )}
                {user.pays && (
                  <Box mb={2}>
                    <Typography variant="subtitle2" color="text.secondary">Pays</Typography>
                    <Typography variant="body1">{user.pays}</Typography>
                  </Box>
                )}
              </Grid>
            </Grid>

            <Box textAlign="center" mt={4}>
              <Button variant="contained" color="primary" onClick={redirectToLogin}>
                Se déconnecter
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Profile;
