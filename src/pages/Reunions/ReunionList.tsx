import React, { useEffect, useState } from 'react';
import { Reunion } from '../../types/Reunion';
import { getAllReunions } from '../../services/reunionService';
import {Box, Button, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";




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

    return (

<>
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">📅 Liste des Réunions</Typography>
        <Button variant="contained" color="primary" onClick={handleCreate}>
            +  Créer une réunion
        </Button>

    </Box>
        <div className="card mt-4">

            <div className="card-body">


                <div className="table-responsive">
                    <table className="table table-hover custom-table">
                        <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Date et Heure</th>
                            <th>Lieu</th>
                            <th>Description</th>
                            <th>Participants</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reunions.map((reunion) => (
                            <tr key={reunion.id}>
                                <td>{reunion.titre}</td>
                                <td>{new Date(reunion.dateHeure).toLocaleString('fr-FR')}</td>
                                <td>{reunion.lieu}</td>
                                <td>{reunion.description}</td>
                                <td>
                                    {reunion.participations && reunion.participations.length > 0 ? (
                                        <ul className="list-unstyled mb-0">
                                            {reunion.participations.map((p) => (
                                                <li key={p.id}>
                                                    {p.employe.prenom} {p.employe.nom}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <em>Aucun</em>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
</>

    );
};

export default ReunionList;
