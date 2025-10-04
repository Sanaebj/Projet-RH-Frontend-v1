import { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Paper, Box } from "@mui/material";
import EmployeeLayout from "../../EmployeeLayout.tsx";

export default function DemandeConge() {
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [message, setMessage] = useState("");
  const [soldeConge, setSoldeConge] = useState(0);

  const employeId = 1; // 🔹 Ici tu peux récupérer l'ID depuis le contexte utilisateur connecté

  // ⚡ Récupérer le solde de congés dès que le composant est monté
  useEffect(() => {
    fetch(`http://localhost:2233/api/conges/solde/${employeId}`)
      .then(res => res.text())
      .then(data => setSoldeConge(Number(data)))
      .catch(err => console.error("Erreur récupération solde congés :", err));
  }, [employeId]);
  

  const handleSubmit = () => {
    if (!dateDebut || !dateFin) {
      setMessage("⚠️ Veuillez remplir toutes les dates.");
      return;
    }

    if (new Date(dateDebut) > new Date(dateFin)) {
      setMessage("⚠️ La date de début doit être avant la date de fin.");
      return;
    }

    fetch(`http://localhost:2233/api/conges/demander/${employeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dateDebut, dateFin })
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors de l'envoi de la demande");
        return res.json();
      })
      .then(() => {
        setMessage("✅ Demande envoyée avec succès !");
        setDateDebut("");
        setDateFin("");
        // 🔹 Actualiser le solde après la demande
        fetch(`http://localhost:2233/api/conges/solde/${employeId}`)
        .then(res => res.json())
        .then(data => setSoldeConge(data))
      
      })
      .catch(() => setMessage("❌ Erreur lors de l'envoi de la demande."));
  };

  return (
    <EmployeeLayout>
      <Typography variant="h4" gutterBottom>
        Demande de congé
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Solde actuel de congés : {soldeConge} jours
      </Typography>

      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Paper sx={{ p: 4 }}>
          <TextField
            label="Date de début"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
          />
          <TextField
            label="Date de fin"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
          />

          {message && (
            <Typography
              sx={{ mt: 2, color: message.includes("✅") ? "green" : "red" }}
            >
              {message}
            </Typography>
          )}

          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Envoyer la demande
            </Button>
          </Box>
        </Paper>
      </Container>
    </EmployeeLayout>
  );
}
