import { useLocation, useNavigate } from 'react-router-dom';
import { fontFamily } from 'theme/typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ListItem from './list-items/ListItem';
import CollapseListItem from './list-items/CollapseListItem';
import Image from 'components/base/Image';
import IconifyIcon from 'components/base/IconifyIcon';
import LogoImg from 'assets/images/img.ico';
import sitemapEmp from '../../../routes/sitemapEmp'; // ✅ corriger l'import

const DrawerItems: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token'); // supprime le token
    navigate('/auth/signin', { replace: true }); // redirige vers login
  };

  return (
    <>
      {/* Header */}
      <Stack
        pt={5}
        pb={3.5}
        px={4.5}
        position="sticky"
        top={0}
        bgcolor="info.light"
        alignItems="center"
        justifyContent="flex-start"
        borderBottom={1}
        borderColor="info.main"
        zIndex={1000}
      >
        <ButtonBase component={Link} href="/" disableRipple>
          <Image src={LogoImg} alt="logo" height={70} width={70} sx={{ mr: 2.75 }} />
          <Box>
            <Typography
              mt={0.25}
              variant="h3"
              color="primary.main"
              textTransform="uppercase"
              letterSpacing={1}
              fontFamily={fontFamily.poppins}
            >
              RH
            </Typography>
            <Typography
              mt={-0.35}
              variant="body2"
              color="primary.main"
              textTransform="uppercase"
              fontWeight={500}
              fontFamily={fontFamily.poppins}
            >
              Employé
            </Typography>
          </Box>
        </ButtonBase>
      </Stack>

      {/* Navigation list */}
      <List component="nav" sx={{ mt: 2.5, mb: 10, px: 4.5 }}>
        {sitemapEmp.map((route) =>
          route.items ? (
            <CollapseListItem
              key={route.id}
              {...route}
              active={route.path ? location.pathname.startsWith(route.path) : false}
            />
          ) : (
            <ListItem key={route.id} {...route} active={location.pathname === route.path} />
          ),
        )}
      </List>

      {/* Logout button */}
      <Box mt="auto" px={3} pb={6}>
        <Button
          variant="text"
          startIcon={<IconifyIcon icon="ic:baseline-logout" />}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Box>
    </>
  );
};

export default DrawerItems;
