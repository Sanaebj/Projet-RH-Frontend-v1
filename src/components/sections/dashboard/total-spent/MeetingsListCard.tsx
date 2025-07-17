import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

const meetings = [
    { date: '18 Juillet 2025', title: 'Réunion RH mensuelle' },
    { date: '25 Juillet 2025', title: 'Entretien annuel - Équipe Dev' },
    { date: '01 Août 2025', title: 'Réunion sécurité interne' },
];

const monthlyMeetings = [
    { month: 'Juillet 2025', count: 2 },
    { month: 'Août 2025', count: 1 },
];

const MeetingsListCard = () => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                {/* Titre section 1 */}
                <Typography variant="h6" gutterBottom>
                    📅 Réunions à venir
                </Typography>

                {/* Liste des réunions */}
                <List>
                    {meetings.map((meeting, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <EventIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary={meeting.title}
                                secondary={meeting.date}
                                primaryTypographyProps={{ fontWeight: 500 }}
                            />
                        </ListItem>
                    ))}
                </List>

                {/* Séparation */}
                <Divider sx={{ my: 2 }} />

                {/* Graphique des réunions */}
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                    📈 Réunions par mois (graphique)
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                        data={monthlyMeetings}
                        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#5b21b6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default MeetingsListCard;
