import React, { useState } from 'react';
import axios from 'axios';

const ReunionCreate: React.FC = () => {
    const [titre, setTitre] = useState('');
    const [dateHeure, setDateHeure] = useState('');
    const [lieu, setLieu] = useState('');
    const [description, setDescription] = useState('');
    const [employeNomsComplet, setEmployeNomsComplet] = useState<string[]>(['']);

    const handleEmployeChange = (index: number, value: string) => {
        const updated = [...employeNomsComplet];
        updated[index] = value;
        setEmployeNomsComplet(updated);
    };

    const addParticipant = () => {
        setEmployeNomsComplet([...employeNomsComplet, '']);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:2233/api/reunions', {
                titre,
                dateHeure,
                lieu,
                description,
                employeNomsComplet,
            });

            console.log('Réunion créée avec succès :', response.data);
            alert("Réunion créée avec succès !");
            // reset formulaire
            setTitre('');
            setDateHeure('');
            setLieu('');
            setDescription('');
            setEmployeNomsComplet(['']);
        } catch (error) {
            console.error('Erreur lors de la création de la réunion :', error);
            alert("Erreur lors de la création de la réunion.");
        }
    };

    return (
        <div className="reunion-form-container">
            <h2>Créer une Réunion</h2>
            <form onSubmit={handleSubmit} className="reunion-form">
                <label>Titre :</label>
                <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} required />

                <label>Date et Heure :</label>
                <input type="datetime-local" value={dateHeure} onChange={(e) => setDateHeure(e.target.value)} required />

                <label>Lieu :</label>
                <input type="text" value={lieu} onChange={(e) => setLieu(e.target.value)} required />

                <label>Description :</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

                <label>Participants :</label>
                {employeNomsComplet.map((nom, index) => (
                    <input
                        key={index}
                        type="text"
                        value={nom}
                        onChange={(e) => handleEmployeChange(index, e.target.value)}
                        placeholder={`Participant ${index + 1}`}
                        required
                    />
                ))}
                <button type="button" onClick={addParticipant} className="btn-add-participant">
                    + Ajouter un participant
                </button>

                <button type="submit" className="btn-submit">Créer la Réunion</button>
            </form>
        </div>
    );
};

export default ReunionCreate;
