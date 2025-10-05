// ../SessionEmploye/pages/dashboard/DemandesPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '@mui/material';

const DemandesPage: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mes Demandes</h2>

      <Card style={{ padding: '1rem', marginBottom: '1rem' }}>
        <h3>Faire une demande</h3>
        <p>Choisissez le type de demande :</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/employee/demandes/conges">
            <Button variant="contained" color="primary">
              Demande de Congé
            </Button>
          </Link>

          <Link to="/employee/demandes/documents">
            <Button variant="contained" color="secondary">
              Demande de Document
            </Button>
          </Link>

          <Link to="/employee/demandes/attestation">
            <Button variant="contained" style={{ backgroundColor: '#4caf50', color: '#fff' }}>
              Demande d’Attestation
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default DemandesPage;
