import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import { createEmploye } from '../../services/employe.service';

type EmployeForm = Omit<{
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  photo: string;
  matricule: string;
  service: string;
  poste: string;
  salaire: string;
  genre: 'HOMME' | 'FEMME';
  dateCreation: string;
  dateEmbauche: string;
  cin: string;
}, 'id' | 'matricule' | 'dateCreation' | 'photo'>;

const EmployeCreate = () => {
  const navigate = useNavigate();

  const [employe, setEmploye] = useState<EmployeForm>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    service: '',
    poste: '',
    salaire: '0',
    genre: 'HOMME',
    dateEmbauche: '',
    cin: '',
  });


  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmploye((prev) => ({
      ...prev,
      [name]: name === 'salaire' && value === '' ? '0' : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setEmploye((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employe.salaire || isNaN(Number(employe.salaire)) || Number(employe.salaire) <= 0) {
      alert('Veuillez saisir un salaire valide supérieur à 0');
      return;
    }

    try {
      // Cast en ajoutant les champs manquants requis par le backend
      const employeToSend = {
        ...employe,
        photo: '' // valeur vide si aucune photo gérée
      };

      await createEmploye(employeToSend);
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
                  onChange={handleInputChange}
                  fullWidth
                  required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Prénom"
                  name="prenom"
                  value={employe.prenom}
                  onChange={handleInputChange}
                  fullWidth
                  required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Email"
                  name="email"
                  value={employe.email}
                  onChange={handleInputChange}
                  fullWidth
                  required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Téléphone"
                  name="telephone"
                  type="tel"
                  value={employe.telephone}
                  onChange={(e) => {
                    const input = e.target.value.replace(/[^\d]/g, ''); // supprime tout sauf chiffres
                    const withoutPrefix = input.startsWith('212') ? input.slice(3) : input;
                    setEmploye((prev) => ({
                      ...prev,
                      telephone: `+212${withoutPrefix}`,
                    }));
                  }}
                  inputProps={{
                    pattern: '\\+212[0-9]{9}', // ✅ accepte +212 suivi de 9 chiffres
                    title: 'Le numéro doit être au format +212XXXXXXXXX',
                  }}
                  fullWidth
                  required
              />

            </Grid>
            <Grid item xs={12}>
              <TextField
                  label="Adresse"
                  name="adresse"
                  value={employe.adresse}
                  onChange={handleInputChange}
                  fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Poste"
                  name="poste"
                  value={employe.poste}
                  onChange={handleInputChange}
                  fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Service"
                  name="service"
                  value={employe.service}
                  onChange={handleInputChange}
                  fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Salaire"
                  name="salaire"
                  type="number"
                  value={employe.salaire}
                  onChange={(e) =>
                      setEmploye((prev) => ({
                        ...prev,
                        salaire: e.target.value,
                      }))
                  }
                  fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Genre</InputLabel>
                <Select
                    name="genre"
                    value={employe.genre}
                    onChange={handleSelectChange}
                    label="Genre"
                >
                  <MenuItem value="HOMME">Homme</MenuItem>
                  <MenuItem value="FEMME">Femme</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Date d'embauche"
                  name="dateEmbauche"
                  type="date"
                  value={employe.dateEmbauche}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="CIN"
                  name="cin"
                  value={employe.cin}
                  onChange={handleInputChange}
                  fullWidth
                  required
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Enregistrer
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
  );
};

export default EmployeCreate;