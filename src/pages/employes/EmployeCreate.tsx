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

type EmployeForm = Omit<
  {
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
  },
  'id' | 'matricule' | 'dateCreation' | 'photo'
>;

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
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);

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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation du salaire : doit être un nombre valide et > 0
    if (!employe.salaire || isNaN(Number(employe.salaire)) || Number(employe.salaire) <= 0) {
      alert('Veuillez saisir un salaire valide supérieur à 0');
      return;
    }

    const formData = new FormData();

    const keysToSend: (keyof EmployeForm)[] = [
      'nom',
      'prenom',
      'email',
      'telephone',
      'adresse',
      'dateEmbauche',
      'service',
      'poste',
      'salaire',
    ];

    keysToSend.forEach((key) => {
      const value = employe[key];

      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    if (photoFile) {
      formData.append('photo', photoFile);
    }

    try {
      await createEmploye(formData);
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
      <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={2}>
          {/* ... les autres champs ... */}
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
              value={employe.telephone}
              onChange={handleInputChange}
              fullWidth
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
      salaire: e.target.value // garde la string jusqu’à l’envoi
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

                <Grid item xs={12}>
            <Button variant="contained" component="label" fullWidth>
              Télécharger la photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </Button>
            {photoFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {photoFile.name}
              </Typography>
            )}
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
