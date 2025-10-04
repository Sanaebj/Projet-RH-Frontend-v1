import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axiosInstance from "services/axiosInstance";

interface DemandeConge {
  id: number;
  employe: {
    nom: string;
    prenom: string;
  };
  dateDebut: string;
  dateFin: string;
}

const TableauConges: React.FC = () => {
  const [data, setData] = useState<DemandeConge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConges();
  }, []);

  const fetchConges = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get<DemandeConge[]>("/conges/en-attente");
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des congés");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Employés en congé
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employé</TableCell>
              <TableCell>Date début</TableCell>
              <TableCell>Date fin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d.id}>
                <TableCell>
                  {d.employe.nom} {d.employe.prenom}
                </TableCell>
                <TableCell>
                  {new Date(d.dateDebut).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(d.dateFin).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableauConges;
