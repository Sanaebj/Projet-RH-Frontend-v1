import { useEffect, useState, FC } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TopCardsEmp from "../../components/sections/dashboard/top-cards";

import AvatarCard from "components/sections/dashboard/avatar-card";
import MeetingsListCard from "components/sections/dashboard/total-spent/MeetingsListCard.tsx";
import EmployeeLayout from "../../EmployeeLayout.tsx";
import { decodeToken, TokenPayload } from "../../../services/decodeToken.ts";

const DashboardEmp: FC = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [soldeConge, setSoldeConge] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: TokenPayload = decodeToken(token);
      const role = decoded.role || "";
      const rawName = decoded.name || decoded.sub || "Employé";
      const employeeShortName = rawName.split("@")[0];

      if (role.toUpperCase() !== "EMPLOYE") return;

      setEmployeeName(`Bienvenue, ${employeeShortName}`);

      // ✅ Solde depuis le token directement
      const soldeFromToken = decoded.soldeConge ?? 0;
      setSoldeConge(soldeFromToken);
      console.log("Solde récupéré depuis le token :", soldeFromToken);
    } catch (err) {
      console.error("Erreur décodage token :", err);
    }
  }, []);

  return (
    <EmployeeLayout>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        {employeeName}
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
        {`Solde de congés : ${soldeConge} jours`}
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <TopCardsEmp />
        </Grid>

        <Grid item xs={12} md={8}>
          <MeetingsListCard />
        </Grid>


        <Grid item xs={12} md={4}>
          <AvatarCard />
        </Grid>

       
      </Grid>
    </EmployeeLayout>
  );
};

export default DashboardEmp;
