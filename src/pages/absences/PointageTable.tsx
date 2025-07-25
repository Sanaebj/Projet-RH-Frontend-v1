import React, { useEffect, useState } from 'react';
import { PointageJour } from '../../types/PointageJour';
import {Box, Typography} from '@mui/material';


const PointageTable: React.FC = () => {
    const [pointages, setPointages] = useState<PointageJour[]>([]);


    useEffect(() => {
        fetch('http://localhost:2233/api/pointage/jour')
            .then(res => res.json())
            .then(data => setPointages(data))
            .catch(err => console.error("Erreur chargement pointages:", err));
    }, []);

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">📝 Pointage Journalier</Typography>
            </Box>
            <div className="card mt-4">

                <div className="card-body">


                    <div className="table-responsive">

                        <table className="table table-hover custom-table">
                <thead>
                <tr>
                    <th>Employé</th>
                    <th>Entrée</th>
                    <th>Sortie</th>
                    <th>Retard</th>
                </tr>
                </thead>
                <tbody>
                {pointages.map((p, index) => (
                    <tr key={index}>
                        <td>{p.nomComplet}</td>
                        <td>{p.heureEntree || '--'}</td>
                        <td>{p.heureSortie || '--'}</td>
                        <td style={{ color: p.retard.includes('🔴') ? 'red' : 'green', fontWeight: 'bold' }}>
                            {p.retard}
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

export default PointageTable;
