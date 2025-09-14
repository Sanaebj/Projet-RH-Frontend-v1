import { useEffect, useState } from 'react';
import {
    AppBar, Toolbar, Typography, Box, CssBaseline, Drawer,
    List, ListItem, ListItemIcon, ListItemText, IconButton, Grid, Paper
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

export default function DashboardEmp() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [employeeName, setEmployeeName] = useState('');

    useEffect(() => {
        // Exemple: tu peux récupérer le nom depuis le token
        setEmployeeName('Bienvenue, Employé');
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                <ListItem button>
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary="Accueil" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><AssignmentIcon /></ListItemIcon>
                    <ListItemText primary="Mes Tâches" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Déconnexion" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Tableau de bord Employé
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Contenu principal */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    backgroundColor: '#f5f6fa',
                    minHeight: '100vh'
                }}
            >
                <Toolbar />
                <Typography variant="h4" gutterBottom>
                    {employeeName}
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">Mes tâches</Typography>
                            <Typography variant="body2">5 tâches en cours</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">Présences</Typography>
                            <Typography variant="body2">20 jours ce mois</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">Messages</Typography>
                            <Typography variant="body2">3 nouveaux messages</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
