import { useLocation } from 'react-router-dom'; // ✅ Ajouté pour détecter l’URL active
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
import sitemap from 'routes/sitemap';

const DrawerItems = () => {
    const location = useLocation(); // ✅ Hook pour lire l’URL actuelle

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
                            Manager
                        </Typography>
                    </Box>
                </ButtonBase>
            </Stack>

            {/* Navigation list */}
            <List component="nav" sx={{ mt: 2.5, mb: 10, px: 4.5 }}>
                {sitemap.map((route) =>
                    route.items ? (
                        <CollapseListItem
                            key={route.id}
                            {...route}
                            active={route.path ? location.pathname.startsWith(route.path) : false}
                            // ✅ Actif si l’URL commence par ce path
                        />
                    ) : (
                        <ListItem
                            key={route.id}
                            {...route}
                            active={location.pathname === route.path} // ✅ Actif si l’URL correspond exactement
                        />
                    )
                )}
            </List>

            {/* Logout button */}
            <Box mt="auto" px={3} pb={6}>
                <Button variant="text" startIcon={<IconifyIcon icon="ic:baseline-logout" />}>
                    Log Out
                </Button>
            </Box>
        </>
    );
};

export default DrawerItems;
