import { useEffect, useState } from "react";
import axiosInstance from "../../../../../services/axiosInstance";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconifyIcon from "components/base/IconifyIcon";
import { decodeToken, TokenPayload } from "../../../../../services/decodeToken";

const Earnings = () => {
  const [nombreDemandes, setNombreDemandes] = useState<number>(0);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: TokenPayload = decodeToken(token);
      const decodedRole = decoded.role || "";
      setRole(decodedRole);

      if (decodedRole.toUpperCase() === "ADMIN") {
        axiosInstance
          .get<number>("/demandes-documents/count")
          .then((response) => setNombreDemandes(response.data))
          .catch((error) => {
            console.error(
              "❌ Erreur lors de la récupération du nombre de demandes :",
              error
            );
          });
      }
    } catch (err) {
      console.error("Erreur lors du décodage du token :", err);
    }
  }, []);

  // 🚨 On affiche rien si ce n’est pas ADMIN
  if (role.toUpperCase() !== "ADMIN") {
    return null;
  }

  return (
    <Paper
      component={Stack}
      alignItems="center"
      justifyContent="space-between"
      sx={{ px: 2, py: 3 }}
    >
      <Stack alignItems="center" justifyContent="flex-start" spacing={2}>
        <Stack
          alignItems="center"
          justifyContent="center"
          height={56}
          width={56}
          bgcolor="info.main"
          borderRadius="50%"
        >
          <IconifyIcon
            icon="ic:round-bar-chart"
            color="primary.main"
            fontSize="h3.fontSize"
          />
        </Stack>
        <Box>
          <Typography variant="body2" color="text.disabled" fontWeight={500}>
            Demandes RH
          </Typography>
          <Typography mt={1} variant="h3">
            {nombreDemandes}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default Earnings;
