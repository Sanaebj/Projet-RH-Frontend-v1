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
  import { useEffect, useState } from 'react';
  import { getUpcomingReunions } from '../../../../services/reunionService';
  import { Reunion } from '../../../../types/Reunion';
  import dayjs from 'dayjs';
  import 'dayjs/locale/fr';
  
  dayjs.locale('fr');
  
  const MeetingsListCard = () => {
    const [reunions, setReunions] = useState<Reunion[]>([]);
    const [monthlyMeetings, setMonthlyMeetings] = useState<{ month: string; count: number }[]>([]);
  
    useEffect(() => {
      const fetchReunions = async () => {
        try {
          const data = await getUpcomingReunions();
          setReunions(data);
  
          // Compter les réunions par mois
          const countByMonth: { [key: string]: number } = {};
          data.forEach((reunion: Reunion) => {
            if (reunion.dateHeure) {
              const parsedDate = dayjs(reunion.dateHeure);
              const month = parsedDate.format('MMMM YYYY');
              countByMonth[month] = (countByMonth[month] || 0) + 1;
            }
          });
  
          // Transformer en tableau trié
          const monthlyData = Object.entries(countByMonth)
            .map(([month, count]) => ({ month, count }))
            .sort(
              (a, b) =>
                dayjs(a.month, 'MMMM YYYY').toDate().getTime() -
                dayjs(b.month, 'MMMM YYYY').toDate().getTime()
            );
  
          setMonthlyMeetings(monthlyData);
        } catch (error) {
          console.error('Erreur lors du chargement des réunions :', error);
        }
      };
  
      fetchReunions();
    }, []);
  
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📅 Réunions à venir
          </Typography>
  
          <List>
            {reunions.length > 0 ? (
              reunions.map((meeting, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <EventIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={meeting.titre}
                    secondary={dayjs(meeting.dateHeure).format('DD MMMM YYYY à HH:mm')}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Aucune réunion à venir.
              </Typography>
            )}
          </List>
  
          <Divider sx={{ my: 2 }} />
  
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            📈 Réunions par mois (graphique)
          </Typography>
  
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyMeetings} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#5b21b6"
                radius={[4, 4, 0, 0]}
                label={{ position: 'top', fill: '#111', fontSize: 13 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };
  
  export default MeetingsListCard;
  