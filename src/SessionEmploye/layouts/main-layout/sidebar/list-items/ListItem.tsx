import { Link as RouterLink } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconifyIcon from 'components/base/IconifyIcon';
import type { MenuItem } from 'routes/sitemap';

interface ListItemProps extends MenuItem {
    active: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ subheader, icon, path, active }) => {
    // Empêche le rendu si le chemin est absent
    if (!path) return null;

    return (
        <ListItemButton
            component={RouterLink}
            to={path}
            sx={{
                mb: 2.5,
                borderRadius: 1.5,
                bgcolor: active ? 'primary.main' : 'transparent',
                '&:hover': {
                    bgcolor: active ? 'primary.main' : 'action.hover',
                },
            }}
        >
            <ListItemIcon>
                {icon && (
                    <IconifyIcon
                        icon={icon}
                        fontSize="h4.fontSize"
                        sx={{
                            color: active ? 'info.light' : 'text.secondary',
                        }}
                    />
                )}
            </ListItemIcon>
            <ListItemText
                primary={subheader}
                sx={{
                    '& .MuiListItemText-primary': {
                        color: active ? 'info.light' : 'text.primary',
                        fontWeight: active ? 600 : 400,
                    },
                }}
            />
        </ListItemButton>
    );
};

export default ListItem;
