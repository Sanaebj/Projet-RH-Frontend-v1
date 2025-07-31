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
    salaire: '',
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
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setEmploye((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (tel: string) =>
    /^\+212[5-7][0-9]{8}$/.test(tel);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nom, prenom, email, telephone, salaire, cin, dateEmbauche } = employe;

    if (nom.length < 2 || nom.length > 50) {
      alert('Le nom doit contenir entre 2 et 50 caractères.');
      return;
    }

    if (prenom.length < 2 || prenom.length > 50) {
      alert('Le prénom doit contenir entre 2 et 50 caractères.');
      return;
    }

    if (!isValidEmail(email)) {
      alert("L'email n'est pas valide.");
      return;
    }

    if (!isValidPhone(telephone)) {
      alert("Le numéro de téléphone doit être au format +212XXXXXXXXX.");
      return;
    }

    const salaireNum = Number(salaire);
    if (isNaN(salaireNum) || salaireNum < 1000 || salaireNum > 30000) {
      alert('Le salaire doit être un nombre entre 1000 et 30000 DH.');
      return;
    }

    if (!dateEmbauche) {
      alert("La date d'embauche est obligatoire.");
      return;
    }

    if (cin.length < 4 || cin.length > 10) {
      alert('Le CIN doit contenir entre 4 et 10 caractères.');
      return;
    }

    try {
      const employeToSend = {
        ...employe,
        photo: '',
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
            <TextField label="Nom" name="nom" value={employe.nom} onChange={handleInputChange} fullWidth required />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Prénom" name="prenom" value={employe.prenom} onChange={handleInputChange} fullWidth required />
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
              inputProps={{
                pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
                title: "Veuillez entrer une adresse e-mail valide.",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Téléphone"
              name="telephone"
              value={employe.telephone}
              onChange={(e) => {
                const input = e.target.value.replace(/[^\d]/g, '');
                const withoutPrefix = input.startsWith('212') ? input.slice(3) : input;
                setEmploye((prev) => ({
                  ...prev,
                  telephone: `+212${withoutPrefix}`,
                }));
              }}
              inputProps={{
                pattern: '\\+212[5-7][0-9]{8}',
                title: 'Le numéro doit être au format +212XXXXXXXXX',
              }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Adresse" name="adresse" value={employe.adresse} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Poste" name="poste" value={employe.poste} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Service" name="service" value={employe.service} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Salaire (Dhs)"
              name="salaire"
              type="number"
              value={employe.salaire}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) {
                  setEmploye((prev) => ({
                    ...prev,
                    salaire: val,
                  }));
                }
              }}
              fullWidth
              inputProps={{ min: 1000, max: 30000 }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Genre</InputLabel>
              <Select name="genre" value={employe.genre} onChange={handleSelectChange} label="Genre">
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
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField label="CIN" name="cin" value={employe.cin} onChange={handleInputChange} fullWidth required />
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
