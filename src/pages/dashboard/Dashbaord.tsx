import GrapheConges from "../../components/sections/dashboard/conge/TableauConges";
import Grid from "@mui/material/Grid";
import TopCards from "components/sections/dashboard/top-cards";
import AvatarCard from "components/sections/dashboard/avatar-card";
import MeetingsListCard from "components/sections/dashboard/total-spent/MeetingsListCard.tsx";
  
const Dashbaord = () => {
  return (
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
 
 
 
 
      {/* 👉 Ici tu ajoutes ton GrapheConges */}
      <Grid item xs={12} md={8}>
        <GrapheConges />
      </Grid>

     
    </Grid>
  );
};

export default Dashbaord;
