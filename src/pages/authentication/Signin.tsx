import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Divider, Stack, TextField, InputAdornment, IconButton, Button, FormControlLabel, Checkbox, Link } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import axios from 'axios';
import { decodeToken, TokenPayload } from '../../services/decodeToken';

interface User {
  username: string;
  password: string;
}

function isAxiosError(error: unknown): error is { response?: { data?: string } } {
  return typeof error === 'object' && error !== null && 'response' in error;
}

const Signin = () => {
  const [user, setUser] = useState<User>({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    console.log('📤 Tentative de connexion', user);

    try {
      const response = await axios.post('http://localhost:2233/auth/login', user);
      const token = response.data;

      console.log('📥 Token reçu:', token);

      if (typeof token === 'string') {
        localStorage.setItem('token', token);
        console.log('✅ Token stocké dans localStorage');

        const decoded: TokenPayload = decodeToken(token);
        console.log('🔓 Token décodé:', decoded);

        const userRole = decoded.role;
        console.log('🧑‍💼 Role utilisateur:', userRole);

        if (userRole === 'ADMIN') navigate('/', { replace: true });
        else if (userRole === 'EMPLOYE') navigate('/employee/dashboard', { replace: true });
        else setErrorMessage('Rôle utilisateur inconnu.');
      } else {
        setErrorMessage('Le token reçu n’est pas valide.');
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) setErrorMessage(error.response?.data || 'Erreur lors de la connexion.');
      else if (error instanceof Error) setErrorMessage(error.message);
      else setErrorMessage('Erreur inconnue.');
    }
  };

  return (
    <>
      <Typography align="center" variant="h4">Connexion</Typography>
      <Typography mt={1.5} align="center" variant="body2">Bienvenue, veuillez vous connecter</Typography>
      <Divider sx={{ my: 4 }}>Connexion manuelle</Divider>

      <Stack component="form" mt={3} onSubmit={handleSubmit} direction="column" gap={2}>
        <TextField
          name="username"
          type="text"
          value={user.username}
          onChange={handleInputChange}
          placeholder="Email"
          fullWidth
          autoFocus
          required
          InputProps={{
            startAdornment: <InputAdornment position="start"><IconifyIcon icon="ic:baseline-person" /></InputAdornment>,
          }}
        />
        <TextField
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={user.password}
          onChange={handleInputChange}
          placeholder="Mot de passe"
          fullWidth
          required
          InputProps={{
            startAdornment: <InputAdornment position="start"><IconifyIcon icon="ic:outline-lock" /></InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <IconifyIcon icon={showPassword ? 'ic:outline-visibility' : 'ic:outline-visibility-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack mt={-1.25} alignItems="center" justifyContent="space-between">
          <FormControlLabel control={<Checkbox />} label="Se souvenir de moi" />
          <Link href="#!">Mot de passe oublié ?</Link>
        </Stack>

        {errorMessage && <Typography color="error" align="center">❌ {errorMessage}</Typography>}

        <Button type="submit" variant="contained" fullWidth>Connexion</Button>
      </Stack>
    </>
  );
};

export default Signin;
