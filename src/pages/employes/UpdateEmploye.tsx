import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateEmploye, getEmployeById } from '../../services/employe.service';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Grid,
} from '@mui/material';

type EmployeFormData = {
  matricule: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  service: string;
  poste: string;
  salaire: string;
  genre: 'HOMME' | 'FEMME';
  dateEmbauche: string;
  cin: string;
};

const UpdateEmploye = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [employe, setEmploye] = useState<EmployeFormData>({
    matricule: '',
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

  useEffect(() => {
    if (!id) {
      navigate('/employes');
      return;
    }
    loadEmploye(parseInt(id));
  }, [id, navigate]);

  const loadEmploye = async (id: number) => {
    try {
      const data = await getEmployeById(id);
      setEmploye({
        matricule: data.matricule || '',
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone,
        adresse: data.adresse,
        service: data.service,
        poste: data.poste,
        salaire: data.salaire,
        genre: data.genre,
        dateEmbauche: data.dateEmbauche,
        cin: data.cin,
      });
    } catch (error) {
      console.error("Erreur lors du chargement de l'employé", error);
      navigate('/employes');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmploye((prev) => ({
      ...prev,
      [name]: name === 'salaire' && value === '' ? '0' : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const salaireNum = parseFloat(employe.salaire);

    if (isNaN(salaireNum) || salaireNum < 0 || salaireNum > 30000) {
      alert('Le salaire doit être un nombre valide et ne pas dépasser 30 000 DH');
      return;
    }

    if (!id) return;

    try {
      const employeToSend = {
        ...employe,
        photo: '', // Champ ignoré ou vide
      };

      await updateEmploye(parseInt(id), employeToSend);
      navigate('/employes');
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'employé", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Modifier les informations de l'employé
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Matricule"
              name="matricule"
              value={employe.matricule}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
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
              type="email"
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
              value={employe.telephone}
              onChange={handleInputChange}
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
              required
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
              label="Poste"
              name="poste"
              value={employe.poste}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Salaire"
              name="salaire"
              value={employe.salaire}
              onChange={handleInputChange}
              type="number"
              fullWidth
              required
              inputProps={{ min: 0, max: 30000 }}
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
          <Grid item xs={6}>
            <TextField
              label="Date d'embauche"
              name="dateEmbauche"
              value={employe.dateEmbauche}
              onChange={handleInputChange}
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/employes')}
              >
                Annuler
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Mettre à jour
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default UpdateEmploye;
