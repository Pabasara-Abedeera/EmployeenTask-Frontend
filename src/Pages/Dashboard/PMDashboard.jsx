import * as React from 'react';
import Card from '../../Components/Card';
import { Grid } from '@material-ui/core';
import { Link} from 'react-router-dom';
export default function PMDashboard() {


  const projectMnger=
    {id:1,name:"Nadun Perera"};
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
            
    <Link to={`/AssignedProjects/${projectMnger.id}`} style={{textDecoration:"none"}}>
      <Card text="ADD/EDIT PROJECTS" img='https://img.freepik.com/premium-vector/business-team-planning-schedule-office-vector-illustration_450176-82.jpg' alt="projects" />
    </Link>
    </Grid>
    <Grid item xs={4}>
  <Link to='/EmpForPm' style={{ textDecoration: 'none' }}>   
  <Card text="VIEW EMPLOYEE" img='https://www.pngitem.com/pimgs/m/603-6039664_employee-assistance-program-vector-hd-png-download.png' alt="employees" />   
</Link>
</Grid>

    </Grid>

</div>
  );
}