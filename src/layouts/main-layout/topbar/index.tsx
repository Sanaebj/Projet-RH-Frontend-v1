import { useEffect, useState } from 'react';  
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
 import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
 import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import IconifyIcon from 'components/base/IconifyIcon';
import LanguageSelect from './LanguageSelect';
import ProfileMenu from './ProfileMenu';
import Image from 'components/base/Image';
import LogoImg from 'assets/images/img.ico';

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
  employe: Employe | null;
  vue?: boolean;
}

const Topbar = ({ isClosing, mobileOpen, setMobileOpen }: TopbarProps) => {
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<DemandeDocument[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    if (!isClosing) setMobileOpen(!mobileOpen);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationItemClick = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, vue: true } : notif
      )
    );

    const viewedIds = JSON.parse(localStorage.getItem('viewedNotifications') || '[]') as number[];
    if (!viewedIds.includes(id)) {
      viewedIds.push(id);
      localStorage.setItem('viewedNotifications', JSON.stringify(viewedIds));
    }

    setNotificationCount((prevCount) => Math.max(prevCount - 1, 0));

    handleClose();
    navigate('/demandes');
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get<DemandeDocument[]>(
          'http://localhost:2233/api/demandes-documents/non-vues',
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          }
        );

        const viewedIds = JSON.parse(localStorage.getItem('viewedNotifications') || '[]') as number[];

        const notifsAvecVue = response.data.map((notif) => ({
          ...notif,
          vue: viewedIds.includes(notif.id),
        }));

        setNotifications(notifsAvecVue);

        const nonVuesCount = notifsAvecVue.filter((notif) => !notif.vue).length;
        setNotificationCount(nonVuesCount);

        console.log('Nombre notifications non vues:', nonVuesCount);
      } catch (error) {
        console.error('Erreur chargement notifications:', error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Stack py={3.5} alignItems="center" justifyContent="space-between" zIndex={1200} direction="row" px={2}>
      <Stack spacing={{ xs: 2, sm: 3 }} alignItems="center" direction="row">
        <ButtonBase
          component={Link}
          href="/"
          disableRipple
          sx={{ lineHeight: 0, display: { xs: 'none', sm: 'block', lg: 'none' } }}
        >
          <Image src={LogoImg} alt="logo" height={40} width={40} />
        </ButtonBase>

        <Toolbar sx={{ display: { xs: 'block', lg: 'none' } }}>
          <IconButton size="large" edge="start" color="inherit" onClick={handleDrawerToggle}>
            <IconifyIcon icon="ic:baseline-menu" />
          </IconButton>
        </Toolbar>

         
        
      </Stack>

      <Stack spacing={{ xs: 1, sm: 2 }} alignItems="center" direction="row">
        <LanguageSelect />

        <IconButton
          size="large"
          onClick={handleNotificationClick}
          sx={{ position: 'relative' }} // IMPORTANT pour le badge
        >
          <Badge
            badgeContent={notificationCount > 0 ? notificationCount : null}
            color="error"
            showZero={false}
            sx={{
              '& .MuiBadge-badge': {
                color: '#fff',
                backgroundColor: '#d32f2f',
                fontWeight: 'bold',
                minWidth: 18,
                height: 18,
                borderRadius: 9,
                fontSize: 12,
                lineHeight: 1,
                padding: '0 6px',
                right: 4,
                top: 4,
                boxShadow: '0 0 0 2px white',
              },
            }}
          >
            <IconifyIcon icon="ic:outline-notifications" />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              maxWidth: 360,
              maxHeight: 400,
              overflowY: 'auto',
            },
          }}
        >
          {notifications.length === 0 ? (
            <MenuItem disabled>
              <Typography variant="body2">Aucune notification</Typography>
            </MenuItem>
          ) : (
            notifications.map((notif) => (
              <MenuItem
                key={notif.id}
                onClick={() => handleNotificationItemClick(notif.id)}
                sx={{
                  whiteSpace: 'normal',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  bgcolor: notif.vue ? 'background.paper' : 'action.selected',
                }}
              >
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    {notif.employe ? `${notif.employe.nom} ${notif.employe.prenom}` : 'Employé inconnu'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    a demandé un document : {notif.type}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    Le {new Date(notif.dateDemande).toLocaleDateString()}
                  </Typography>
                </Box>
              </MenuItem>
            ))
          )}
        </Menu>

        <ProfileMenu />
      </Stack>
    </Stack>
  );
};

export default Topbar;
