import { useEffect, useState, FC } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TopCards from "components/sections/dashboard/top-cards";
import AvatarCard from "components/sections/dashboard/avatar-card";
import MeetingsListCard from "components/sections/dashboard/total-spent/MeetingsListCard";
import GrapheConges from "components/sections/dashboard/conge/TableauConges";
import EmployeeLayout from "./EmployeeLayout";
import axiosInstance from "../services/axiosInstance";
import { decodeToken, TokenPayload } from "../services/decodeToken";

const DashboardEmp: FC = () => {
  const [employeeName, setEmployeeName] = useState<string>("");
  const [soldeConge, setSoldeConge] = useState<number | null>(null);
  const [loadingSolde, setLoadingSolde] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: TokenPayload = decodeToken(token);
      const employeId = Number(decoded.userId);
      const role = decoded.role || "";
      const rawName = decoded.name || decoded.sub || "Employé";
      const employeeShortName = rawName.split("@")[0];

      setEmployeeName(`Bienvenue, ${employeeShortName}`);
      setLoadingSolde(true);

      if (role.toUpperCase() !== "EMPLOYE") return;

      // ✅ Récupération du solde de congés
      axiosInstance
        .get(`/conges/solde/${employeId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // ← absolument nécessaire
          },
        })
        .then((res) => {
          console.log("Solde récupéré Axios :", res.data);
          const solde = Number(res.data);
          setSoldeConge(!isNaN(solde) ? solde : null);
        })
        .catch((err) => {
          console.error("Erreur récupération solde congé :", err);
          setSoldeConge(null);
        })
        .finally(() => setLoadingSolde(false));
    } catch (err) {
      console.error("Erreur décodage token :", err);
      setLoadingSolde(false);
    }
  }, []);

  return (
    <EmployeeLayout>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        {employeeName}
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
        {loadingSolde
          ? "Chargement du solde de congés..."
          : soldeConge !== null
          ? `Solde de congés : ${soldeConge} jours`
          : "Impossible de récupérer le solde de congés."}
      </Typography>

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
        <Grid item xs={12}>
          <GrapheConges />
        </Grid>
      </Grid>
    </EmployeeLayout>
  );
};

export default DashboardEmp;
