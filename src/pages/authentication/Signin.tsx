import { useState, ChangeEvent, FormEvent } from 'react';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import IconifyIcon from 'components/base/IconifyIcon';
import paths from 'routes/paths';
import axios from 'axios';
import * as jwtDecodeRaw from 'jwt-decode';
import jwtDecode from 'jwt-decode';


interface User {
    username: string;
    password: string;
}

interface JwtPayload {
    sub: string;
    role: string;
    exp: number;
}

function isAxiosError(error: unknown): error is { response?: { data?: string } } {
    return typeof error === 'object' && error !== null && 'response' in error;
}

const Signin = () => {
    const [user, setUser] = useState<User>({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('' +
                '', {
                username: user.username,
                password: user.password,
            });

            const token = response.data;

            if (typeof token === 'string') {
                localStorage.setItem('token', token);

                const decoded: JwtPayload = jwtDecode(token);
                const userRole = decoded.role;

                if (userRole === 'ADMIN') {
                    window.location.href = '/admin/dashboard';
                } else {
                    window.location.href = '/dashboard';
                }

            } else {
                setErrorMessage("Le token reçu n'est pas valide.");
            }

        } catch (error: unknown) {
            if (isAxiosError(error)) {
                setErrorMessage(error.response?.data || 'Erreur lors de la connexion');
            } else {
                setErrorMessage('Erreur inconnue');
            }
        }
    };

    return (
        <>
            <Typography align="center" variant="h4">
                Connexion
            </Typography>
            <Typography mt={1.5} align="center" variant="body2">
                Bienvenue, veuillez vous connecter
            </Typography>

            <Divider sx={{ my: 4 }}>Connexion manuelle</Divider>

            <Stack component="form" mt={3} onSubmit={handleSubmit} direction="column" gap={2}>
                <TextField
                    id="username"
                    name="username"
                    type="text"
                    value={user.username}
                    onChange={handleInputChange}
                    variant="filled"
                    placeholder="Nom d'utilisateur"
                    autoComplete="username"
                    fullWidth
                    autoFocus
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconifyIcon icon="ic:baseline-person" />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={user.password}
                    onChange={handleInputChange}
                    variant="filled"
                    placeholder="Mot de passe"
                    autoComplete="current-password"
                    fullWidth
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconifyIcon icon="ic:outline-lock" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                sx={{
                                    opacity: user.password ? 1 : 0,
                                    pointerEvents: user.password ? 'auto' : 'none',
                                }}
                            >
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    <IconifyIcon
                                        icon={showPassword ? 'ic:outline-visibility' : 'ic:outline-visibility-off'}
                                        color="neutral.light"
                                    />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Stack mt={-1.25} alignItems="center" justifyContent="space-between">
                    <FormControlLabel
                        control={<Checkbox id="checkbox" name="checkbox" size="medium" color="primary" />}
                        label="Se souvenir de moi"
                        sx={{ ml: -0.75 }}
                    />
                    <Link href="#!" fontSize="body2.fontSize">
                        Mot de passe oublié ?
                    </Link>
                </Stack>

                {errorMessage && (
                    <Typography color="error" variant="body2" align="center">
                        ❌ {errorMessage}
                    </Typography>
                )}

                <Button type="submit" variant="contained" size="medium" fullWidth>
                    Connexion
                </Button>
            </Stack>

            <Typography mt={5} variant="body2" color="text.secondary" align="center" letterSpacing={0.25}>
                Pas encore de compte ? <Link href={paths.signup}>Créer un compte</Link>
            </Typography>
        </>
    );
};

export default Signin;