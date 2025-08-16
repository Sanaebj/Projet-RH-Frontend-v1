import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select, { MultiValue } from 'react-select';

interface Employe {
    id: number;
    nom: string;
    prenom: string;
    nomComplet?: string;
}

interface OptionType {
    value: number;
    label: string;
}

const ReunionCreate: React.FC = () => {
    const [titre, setTitre] = useState('');
    const [dateHeure, setDateHeure] = useState('');
    const [lieu, setLieu] = useState('');
    const [description, setDescription] = useState('');
    const [participants, setParticipants] = useState<number[]>([]);
    const [employes, setEmployes] = useState<Employe[]>([]);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployes = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get<Employe[]>(
                    'http://localhost:2233/api/employes',
                    { headers: { Authorization: token ? `Bearer ${token}` : '' } }
                );
                const employesAvecNomComplet = response.data.map(emp => ({
                    ...emp,
                    nomComplet: `${emp.nom} ${emp.prenom}`
                }));
                setEmployes(employesAvecNomComplet);
            } catch (error) {
                console.error("Erreur lors du chargement des employés :", error);
            }
        };
        fetchEmployes();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.post(
                'http://localhost:2233/api/reunions',
                { titre, dateHeure, lieu, description, participants },
                { headers: { Authorization: token ? `Bearer ${token}` : '' } }
            );

            // Affiche le message de succès
            setSuccessMessage('Réunion créée avec succès !');

            // Réinitialise le formulaire
            setTitre('');
            setDateHeure('');
            setLieu('');
            setDescription('');
            setParticipants([]);

            // Redirige après 2 secondes
            setTimeout(() => {
                navigate('/reunions');
            }, 2000);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Erreur Axios :', error.response?.data || error.message);
                alert('Erreur lors de la création de la réunion : ' + (error.response?.data || error.message));
            } else if (error instanceof Error) {
                console.error('Erreur :', error.message);
                alert('Erreur lors de la création de la réunion : ' + error.message);
            } else {
                console.error('Erreur inconnue', error);
                alert('Erreur inconnue lors de la création de la réunion.');
            }
        }
    };

    const options: OptionType[] = employes.map(emp => ({
        value: emp.id,
        label: emp.nomComplet || ''
    }));

    const selectedOptions: OptionType[] = participants
        .map(id => {
            const emp = employes.find(e => e.id === id);
            return emp ? { value: emp.id, label: emp.nomComplet || '' } : null;
        })
        .filter((v): v is OptionType => v !== null);

    return (
        <div className="reunion-form-container">
            <h2>Créer une Réunion</h2>

            {successMessage && <div className="success-message">{successMessage}</div>}

            <form onSubmit={handleSubmit} className="reunion-form">
                <label>Titre :</label>
                <input type="text" value={titre} onChange={e => setTitre(e.target.value)} required />

                <label>Date et Heure :</label>
                <input type="datetime-local" value={dateHeure} onChange={e => setDateHeure(e.target.value)} required />

                <label>Lieu :</label>
                <input type="text" value={lieu} onChange={e => setLieu(e.target.value)} required />

                <label>Description :</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} required />

                <label>Participants :</label>
                <Select<OptionType, true>
                    isMulti
                    options={options}
                    value={selectedOptions}
                    onChange={(selected: MultiValue<OptionType>) =>
                        setParticipants(selected.map(opt => opt.value))
                    }
                    placeholder="Sélectionnez les participants..."
                    noOptionsMessage={() => "Aucun employé disponible"}
                />

                <button type="submit" className="btn-submit">Créer la Réunion</button>
            </form>
        </div>
    );
};

export default ReunionCreate;
