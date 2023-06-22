import * as React from 'react';
import Card from '../../Components/Card';
import { Grid } from '@material-ui/core';
import { Link} from 'react-router-dom';
export default function DevDashboard() {


    const developers = 
        { id: 1, name: "Pabasara Abedeera" }
      ;
  const userName="Pabasara Abedeera"  ;
  const styles = {
    body: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?cs=srgb&dl=pexels-felix-mittermeier-956999.jpg&fm=jpg')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      overflowX: 'hidden',
    },
};
  
  return (
    <div style={styles.body}>
      
        <Grid container style={{marginLeft:"20%", marginTop:"15%",}}>
            
            <Grid item xs={4} >
            
    <Link to={`/AssignedTasks/${developers.name}`} style={{textDecoration:"none"}}>
      <Card text="VIEW TASKS" img='https://static.vecteezy.com/system/resources/previews/004/578/780/original/girl-putting-up-sign-for-plan-schedule-free-vector.jpg' alt="tasks" />
    </Link>
    </Grid>
    <Grid item xs={4}>
  <Link to={`/EditProfile/${developers.id}`} style={{ textDecoration: 'none' }}>   
  <Card text="EDIT PROFILE" img='https://img.freepik.com/free-vector/placeholder-concept-illustration_114360-4983.jpg' alt="client" />   
</Link>
</Grid>

    </Grid>

</div>
  );
}