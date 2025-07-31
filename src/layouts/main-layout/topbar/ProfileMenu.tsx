import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconifyIcon from 'components/base/IconifyIcon';
import ProfileImage from 'assets/images/profile.png';

import { jwtDecode } from 'jwt-decode';
import paths from 'routes/paths';

interface MenuItems {
  id: number;
  title: string;
  icon: string;
}

interface JwtPayload {
  sub: string;  // ici email ou username
  role: string;
  exp: number;
  // pas de nom/prenom dans ton token ?
}

const menuItems: MenuItems[] = [
  { id: 1, title: 'View Profile', icon: 'ic:outline-account-circle' },
  { id: 6, title: 'Logout', icon: 'ic:baseline-logout' },
];

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  // On stocke ici juste le email extrait du token (sub)
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setEmail(decoded.sub);
      } catch (e) {
        console.error('Erreur décodage JWT', e);
      }
    }
  }, []);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (title: string) => {
    handleProfileMenuClose();
  
    if (title === 'Logout') {
      localStorage.removeItem('token');
      navigate(paths.signin);
    }
  
    if (title === 'View Profile') {
      navigate(paths.profile); // Assure-toi que paths.profile existe et pointe vers '/profile'
    }
  };
  
  return (
    <>
      <ButtonBase
        sx={{ ml: 1 }}
        onClick={handleProfileClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        disableRipple
      >
        <Avatar
          src={ProfileImage}
          sx={{
            height: 44,
            width: 44,
            bgcolor: 'primary.main',
          }}
        />
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleProfileMenuClose}
        sx={{
          mt: 1.5,
          '& .MuiList-root': {
            p: 0,
            width: 230,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box p={1}>
          <MenuItem onClick={handleProfileMenuClose} sx={{ '&:hover': { bgcolor: 'info.dark' } }}>
            <Avatar src={ProfileImage} sx={{ mr: 1, height: 42, width: 42 }} />
            <Stack direction="column">
              <Typography variant="body2" color="text.primary" fontWeight={600}>
                {/* Tu peux remplacer 'Utilisateur' par nom/prenom si tu as */}
                Utilisateur
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={400}>
                {email}
              </Typography>
            </Stack>
          </MenuItem>
        </Box>

        <Divider sx={{ my: 0 }} />

        <Box p={1}>
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => handleMenuItemClick(item.title)}
              sx={{ py: 1 }}
            >
              <ListItemIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 'h5.fontSize' }}>
                <IconifyIcon icon={item.icon} />
              </ListItemIcon>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {item.title}
              </Typography>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );
};

export default ProfileMenu;
