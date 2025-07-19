import { useState, useEffect } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { MenuItem } from 'routes/sitemap';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconifyIcon from 'components/base/IconifyIcon';

const CollapseListItem = ({ subheader, items = [], icon }: MenuItem) => {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    // Vérifie si un sous-lien est actif
    const isChildActive = items.some((item) => location.pathname === item.path);

    // Ouvre automatiquement si enfant actif
    useEffect(() => {
        if (isChildActive) {
            setOpen(true);
        }
    }, [isChildActive]);

    const handleClick = () => setOpen((prev) => !prev);

    return (
        <Box sx={{ pb: 1.5 }}>
            <ListItemButton onClick={handleClick} sx={{ bgcolor: isChildActive ? 'primary.main' : 'transparent' }}>
                <ListItemIcon>
                    {icon && (
                        <IconifyIcon
                            icon={icon}
                            sx={{
                                color: isChildActive ? 'info.light' : 'text.secondary',
                            }}
                        />
                    )}
                </ListItemIcon>
                <ListItemText
                    primary={subheader}
                    sx={{
                        '& .MuiListItemText-primary': {
                            color: isChildActive ? 'info.light' : 'text.primary',
                            fontWeight: isChildActive ? 600 : 400,
                        },
                    }}
                />
                <IconifyIcon
                    icon="iconamoon:arrow-down-2-duotone"
                    sx={{
                        color: isChildActive ? 'info.light' : 'text.disabled',
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease-in-out',
                    }}
                />
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {items.map((route) => {
                        const active = location.pathname === route.path;
                        return (
                            <ListItemButton
                                key={route.pathName}
                                component={RouterLink}
                                to={route.path}
                                sx={{
                                    ml: 2.25,
                                    bgcolor: active ? 'info.main' : 'transparent',
                                    '&:hover': {
                                        bgcolor: active ? 'info.main' : 'action.hover',
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={route.name}
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            color: active ? 'primary.main' : 'text.primary',
                                            fontWeight: active ? 600 : 400,
                                        },
                                    }}
                                />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Collapse>
        </Box>
    );
};

export default CollapseListItem;
