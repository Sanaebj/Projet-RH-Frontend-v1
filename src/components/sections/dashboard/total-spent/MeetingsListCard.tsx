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
import { Reunion } from '../../../../types/Reunion';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');

const MeetingsListCard = () => {
  const [reunions, setReunions] = useState<Reunion[]>([]);
  const [monthlyMeetings, setMonthlyMeetings] = useState<{ month: string; count: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReunions = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Token JWT manquant !");
        setReunions([]);
        return;
      }

      try {
        const response = await fetch("http://localhost:2233/api/reunions/upcoming", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des réunions");
        }

        const data: Reunion[] = await response.json();
        setReunions(data);

        // Génération du graphique par mois
        const monthlyData = data.reduce((acc: Record<string, number>, reunion) => {
          const month = dayjs(reunion.dateHeure).format("MMMM");
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});

        setMonthlyMeetings(
            Object.entries(monthlyData).map(([month, count]) => ({
              month,
              count,
            }))
        );

      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Erreur lors du chargement des réunions :", err.message);
          setError(err.message);
        } else {
          console.error("Erreur inconnue :", err);
          setError("Impossible de charger les réunions");
        }
        setReunions([]);
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

          {error && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {error}
              </Typography>
          )}

          <List>
            {reunions.length > 0 ? (
                reunions.map((meeting, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <EventIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                          primary={meeting.titre}
                          secondary={dayjs(meeting.dateHeure).format("DD MMMM YYYY à HH:mm")}
                          primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                ))
            ) : (
                !error && (
                    <Typography variant="body2" color="text.secondary">
                      Aucune réunion à venir.
                    </Typography>
                )
            )}
          </List>

          <Divider sx={{ my: 2 }} />

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
