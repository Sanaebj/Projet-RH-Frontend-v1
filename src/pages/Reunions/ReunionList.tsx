import React, { useEffect, useState } from 'react';
import { Reunion } from '../../types/Reunion';
import { getAllReunions } from '../../services/reunionService';
import {
    Box,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ReunionList: React.FC = () => {
    const [reunions, setReunions] = useState<Reunion[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllReunions();
                setReunions(data);
            } catch (error) {
                console.error('Erreur lors du chargement des réunions :', error);
            }
        };

        fetchData();
    }, []);

    const handleCreate = () => {
        navigate('/reunions/add');
    };

    const headerCellStyle = {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottom: 'none',
    };

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">📅 Liste des Réunions</Typography>
                <Button variant="contained" color="primary" onClick={handleCreate}>
                    + Créer une réunion
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ maxWidth: 1400, margin: 'auto', mt: 4, p: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: '#4f46e5',
                                '& th:first-of-type': {
                                    borderTopLeftRadius: '12px',
                                    borderBottomLeftRadius: '12px',
                                },
                                '& th:last-of-type': {
                                    borderTopRightRadius: '12px',
                                    borderBottomRightRadius: '12px',
                                },
                            }}
                        >
                            <TableCell sx={headerCellStyle}>Titre</TableCell>
                            <TableCell sx={headerCellStyle}>Date et Heure</TableCell>
                            <TableCell sx={headerCellStyle}>Lieu</TableCell>
                            <TableCell sx={headerCellStyle}>Description</TableCell>
                            <TableCell sx={headerCellStyle}>Participants</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {reunions.map((reunion) => (
                            <TableRow key={reunion.id}>
                                <TableCell>{reunion.titre}</TableCell>
                                <TableCell>{new Date(reunion.dateHeure).toLocaleString('fr-FR')}</TableCell>
                                <TableCell>{reunion.lieu}</TableCell>
                                <TableCell>{reunion.description}</TableCell>
                                <TableCell>
                                    {reunion.participations && reunion.participations.length > 0 ? (
                                        <ul style={{ paddingLeft: 16, margin: 0 }}>
                                            {reunion.participations.map((p) => (
                                                <li key={p.id}>
                                                    {p.employe.prenom} {p.employe.nom}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <em>Aucun</em>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ReunionList;
