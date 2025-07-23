import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';

import IconifyIcon from 'components/base/IconifyIcon';
import LanguageSelect from './LanguageSelect';
import ProfileMenu from './ProfileMenu';
import Image from 'components/base/Image';
import LogoImg from 'assets/images/img.ico';

// Type Employe défini strictement
export type Employe = {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  photo: string;
  matricule?: string;
  service: string;
  poste: string;
  salaire: string;
  genre: 'HOMME' | 'FEMME';
  dateCreation?: string;
  dateEmbauche: string;
};

interface TopbarProps {
  isClosing: boolean;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DemandeDocument {
  id: number;
  type: string;
  dateDemande: string;
  documentPret: boolean;
  commentaire: string | null;
  employe: Employe | null;  // ici on utilise le type Employe, pas any
}

const Topbar = ({ isClosing, mobileOpen, setMobileOpen }: TopbarProps) => {
  const [notificationCount, setNotificationCount] = useState(0);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get<DemandeDocument[]>('http://localhost:2233/api/demandes-documents/non-vues');
        setNotificationCount(response.data.length);
      } catch (error) {
        console.error('Erreur lors du chargement des notifications :', error);
      }
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 30000); // Mise à jour toutes les 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <Stack
      py={3.5}
      alignItems="center"
      justifyContent="space-between"
      bgcolor="transparent"
      zIndex={1200}
    >
      <Stack spacing={{ xs: 2, sm: 3 }} alignItems="center">
        <ButtonBase
          component={Link}
          href="/"
          disableRipple
          sx={{ lineHeight: 0, display: { xs: 'none', sm: 'block', lg: 'none' } }}
        >
          <Image src={LogoImg} alt="logo" height={40} width={40} />
        </ButtonBase>

        <Toolbar sx={{ display: { xm: 'block', lg: 'none' } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <IconifyIcon icon="ic:baseline-menu" />
          </IconButton>
        </Toolbar>

        <Toolbar sx={{ ml: -1.5, display: { xm: 'block', md: 'none' } }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="search">
            <IconifyIcon icon="eva:search-fill" />
          </IconButton>
        </Toolbar>

        <TextField
          variant="filled"
          placeholder="Search"
          sx={{ width: 340, display: { xs: 'none', md: 'flex' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="eva:search-fill" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack spacing={{ xs: 1, sm: 2 }} alignItems="center">
        <LanguageSelect />
        <IconButton size="large">
          <Badge badgeContent={notificationCount} color="error">
            <IconifyIcon icon="ic:outline-notifications-none" />
          </Badge>
        </IconButton>
        <ProfileMenu />
      </Stack>
    </Stack>
  );
};

export default Topbar;
