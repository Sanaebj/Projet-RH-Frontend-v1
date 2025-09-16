import { useEffect, useState, FC } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EmployeeLayout from "./EmployeeLayout";
import { AxiosError } from "axios";
import axiosInstance from "../services/axiosInstance";
import { decodeToken, TokenPayload } from "../services/decodeToken";

// Composants spécifiques Admin
import TopCards from "components/sections/dashboard/top-cards";
import AvatarCard from "components/sections/dashboard/avatar-card";
import MeetingsListCard from "components/sections/dashboard/total-spent/MeetingsListCard";

const DashboardEmp: FC = () => {
  const [employeeName, setEmployeeName] = useState<string>("");
  const [soldeConge, setSoldeConge] = useState<number>(0);
  const [loadingSolde, setLoadingSolde] = useState<boolean>(true);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: TokenPayload = decodeToken(token);
      const employeId = Number(decoded.userId);
      const decodedRole = decoded.role || "";
      const rawName = decoded.name || decoded.sub || "Employé";
      const employeeShortName = rawName.split("@")[0];

      setEmployeeName(`Bienvenue, ${employeeShortName}`);
      setRole(decodedRole);
      setLoadingSolde(true);

      // ✅ Charger le solde uniquement pour les employés
      if (decodedRole.toUpperCase() === "EMPLOYE") {
        const url = `/conges/solde/${employeId}`;
 
        axiosInstance
          .get(url)
          .then((res) => {
            const solde =
              typeof res.data === "number"
                ? res.data
                : res.data?.droitAnnuel ?? 0;

            setSoldeConge(!isNaN(solde) ? solde : 0);
          })
          .catch((err: AxiosError) => {
            console.error("❌ Erreur récupération solde congé :", err.message);
            if (err.response) {
              console.error("Response status :", err.response.status);
              console.error("Response data :", err.response.data);
            }
            setSoldeConge(0);
          })
          .finally(() => setLoadingSolde(false));
      } else {
        setLoadingSolde(false);
      }
    } catch (err) {
      console.error("Erreur décodage token :", err);
      setSoldeConge(0);
      setLoadingSolde(false);
    }
  }, []);

  return (
    <EmployeeLayout>
      {/* Nom employé */}
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        {employeeName}
      </Typography>

      {/* ✅ Section Employé : seulement solde */}
      {role.toUpperCase() === "EMPLOYE" && (
        <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
          {loadingSolde
            ? "Chargement du solde de congés..."
            : `Solde de congés : ${soldeConge} jours`}
        </Typography>
      )}

      {/* ✅ Section Admin : dashboard complet */}
      {role.toUpperCase() !== "EMPLOYE" && (
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <TopCards />
          </Grid>
          <Grid item xs={12} md={8}>
            <MeetingsListCard />
          </Grid>
          <Grid item xs={12} md={4}>
            <AvatarCard />
          </Grid>
        </Grid>
      )}
    </EmployeeLayout>
  );
};

export default DashboardEmp;
