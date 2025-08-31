import { useEffect, useState } from 'react'; 
import {
  Container, Typography, Box, CircularProgress, Button,
  Card, CardContent, Avatar, Stack, Divider, Grid, Paper, TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import { AxiosError, AxiosResponse } from 'axios';

interface User {
  nom: string;
  prenom: string;
  email: string;
  username: string;
  role: string;
  telephone?: string;
  adresse?: string;
  password?: string; // pour modification uniquement
}

function isAxiosError(error: unknown): error is AxiosError {
  return (
    error instanceof AxiosError ||
    (typeof error === 'object' &&
      error !== null &&
      'isAxiosError' in error &&
      (error as { isAxiosError?: boolean }).isAxiosError === true)
  );
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const redirectToLogin = () => navigate('/auth/signin', { replace: true });

  // Récupérer les infos de l'utilisateur connecté
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response: AxiosResponse<User> = await axiosInstance.get('/users/me');
        setUser(response.data);
        setFormData({ ...response.data, password: '' }); // password vide par défaut
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    if (!formData) return;
    try {
      const updateData: Partial<User> = { ...formData };
      if (!formData.password) delete updateData.password; // ne pas envoyer le mot de passe vide
      const response = await axiosInstance.put('/users/me', updateData);
      setUser(response.data);
      setFormData({ ...response.data, password: '' }); // reset password
      setEditing(false);
    } catch (err) {
      console.error(err);
      setError("Impossible de mettre à jour le profil.");
    }
  };

  if (loading) return <Box mt={8} textAlign="center"><CircularProgress /></Box>;

  if (error) return (
    <Container>
      <Box mt={8} textAlign="center">
        <Typography variant="h6" color="error" gutterBottom>{error}</Typography>
        <Button variant="contained" color="primary" onClick={redirectToLogin}>Se connecter</Button>
      </Box>
    </Container>
  );

  if (!user || !formData) return (
    <Container>
      <Box mt={8} textAlign="center">
        <Typography variant="h6" color="error">Impossible de charger le profil utilisateur.</Typography>
        <Button variant="contained" color="primary" onClick={redirectToLogin}>Se connecter</Button>
      </Box>
    </Container>
  );

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Card sx={{ borderRadius: 4, boxShadow: 6, p: 3 }}>
          <CardContent>
            {/* Avatar */}
            <Box display="flex" justifyContent="center" mb={3}>
              <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: 40 }}>
                {user.nom.charAt(0)}{user.prenom.charAt(0)}
              </Avatar>
            </Box>

            {/* Nom, Email, Role */}
            <Stack spacing={1} alignItems="center" textAlign="center" mb={3}>
              <Typography variant="h5" fontWeight={600}>{user.nom} {user.prenom}</Typography>
              <Typography variant="body1" color="text.secondary">{user.email}</Typography>
              <Typography variant="body2" sx={{ bgcolor: 'primary.light', px: 2, py: 0.5, borderRadius: 2, fontWeight: 500 }}>
                {user.role}
              </Typography>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Contenu Paper avec affichage ou édition */}
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
              {editing ? (
                <Grid container spacing={2}>
                  <Grid item xs={12}><TextField fullWidth label="Nom" name="nom" value={formData.nom} onChange={handleChange} /></Grid>
                  <Grid item xs={12}><TextField fullWidth label="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} /></Grid>
                  <Grid item xs={12}><TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} /></Grid>
                  <Grid item xs={12}><TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleChange} /></Grid>
                  <Grid item xs={12}><TextField fullWidth label="Téléphone" name="telephone" value={formData.telephone || ''} onChange={handleChange} /></Grid>
                  <Grid item xs={12}><TextField fullWidth label="Adresse" name="adresse" value={formData.adresse || ''} onChange={handleChange} /></Grid>
                  <Grid item xs={12}><TextField fullWidth type="password" label="Mot de passe" name="password" value={formData.password || ''} onChange={handleChange} /></Grid>
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12}><Typography variant="subtitle2" color="text.secondary">Nom complet</Typography><Typography variant="body1">{user.nom} {user.prenom}</Typography></Grid>
                  <Grid item xs={12}><Typography variant="subtitle2" color="text.secondary">Email</Typography><Typography variant="body1">{user.email}</Typography></Grid>
                  <Grid item xs={12}><Typography variant="subtitle2" color="text.secondary">Username</Typography><Typography variant="body1">{user.username}</Typography></Grid>
                  {user.telephone && <Grid item xs={12}><Typography variant="subtitle2" color="text.secondary">Téléphone</Typography><Typography variant="body1">{user.telephone}</Typography></Grid>}
                  {user.adresse && <Grid item xs={12}><Typography variant="subtitle2" color="text.secondary">Adresse</Typography><Typography variant="body1">{user.adresse}</Typography></Grid>}
                </Grid>
              )}
            </Paper>

            <Box textAlign="center" mt={4}>
              {editing ? (
                <>
                  <Button variant="contained" color="success" onClick={handleSave} sx={{ mr: 2 }}>Enregistrer</Button>
                  <Button variant="outlined" color="secondary" onClick={() => setEditing(false)}>Annuler</Button>
                </>
              ) : (
                <Button variant="contained" color="warning" onClick={() => setEditing(true)}>Modifier</Button>
              )}
            </Box>

            <Box textAlign="center" mt={2}>
              <Button variant="contained" color="primary" onClick={redirectToLogin}>Se déconnecter</Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Profile;
