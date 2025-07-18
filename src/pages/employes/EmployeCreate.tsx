import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { createEmploye } from '../../services/employe.service';
import { Employe } from '../../types/Employe';

const EmployeCreate = () => {
  const navigate = useNavigate();
  const [employe, setEmploye] = useState<Employe>({
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    photo: '',
    dateEmbauche: '',
    motDePasseHash: '',
    matricule: '',
    service: '',
    poste: '',
    salaire: 0,
    genre: '',
    statut: '',
    dateCreation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmploye({
      ...employe,
      [name]: name === 'salaire' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEmploye(employe);
      navigate('/employes');
    } catch (error) {
      console.error("Erreur lors de la création de l'employé", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Créer un employé
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Nom"
              name="nom"
              value={employe.nom}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Prénom"
              name="prenom"
              value={employe.prenom}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              name="email"
              value={employe.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Téléphone"
              name="telephone"
              value={employe.telephone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Adresse"
              name="adresse"
              value={employe.adresse}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Matricule"
              name="matricule"
              value={employe.matricule}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Poste"
              name="poste"
              value={employe.poste}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Service"
              name="service"
              value={employe.service}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Salaire"
              name="salaire"
              type="number"
              value={employe.salaire}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Genre"
              name="genre"
              value={employe.genre}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Statut"
              name="statut"
              value={employe.statut}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date d'embauche"
              name="dateEmbauche"
              type="date"
              value={employe.dateEmbauche}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date de création"
              name="dateCreation"
              type="date"
              value={employe.dateCreation}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mot de passe"
              name="motDePasseHash"
              value={employe.motDePasseHash}
              onChange={handleChange}
              fullWidth
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Photo (URL)"
              name="photo"
              value={employe.photo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Enregistrer
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default EmployeCreate;
