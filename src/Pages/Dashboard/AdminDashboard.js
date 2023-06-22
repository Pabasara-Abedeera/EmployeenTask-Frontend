import * as React from 'react';
import Card from '../../Components/Card';
import { Grid } from '@material-ui/core';
import { Link} from 'react-router-dom';
export default function Dashboard() {
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
    card: {
      border: '#fff solid 3px',
      transition: 'background-color 0.5s ease',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        border: '#fff solid 5px',
        borderRadius: 20,
      },
    },};
  
  return (
    <div style={styles.body}>
      
        <Grid container style={{marginLeft:"3%", marginTop:"15%"}}>
            <Grid item xs={4} >
            
    <Link to='/Projects' style={{textDecoration:"none"}}>
      <Card text="ADD PROJECTS" img='https://static.vecteezy.com/system/resources/previews/005/050/221/non_2x/business-meetting-brainstorming-and-anlysis-for-management-and-new-project-free-vector.jpg' alt="project" />
    </Link>
    </Grid>
    <Grid item xs={4}>
  <Link to='/#' style={{ textDecoration: 'none' }}>   
  <Card text="ADD CLIENTS" img='https://static.vecteezy.com/system/resources/previews/019/198/924/non_2x/job-interview-queue-illustration-concept-a-flat-illustration-isolated-on-white-background-vector.jpg' alt="client" />   
</Link>
</Grid>
<Grid item xs={4}>
<Link to='/Employees' style={{ textDecoration: 'none' }}>
<Card text="ADD EMPLOYEES" img='https://static.vecteezy.com/system/resources/previews/002/647/909/non_2x/office-employee-illustration-concept-free-vector.jpg' alt="employee" />
    </Link>
    </Grid>
    </Grid>

</div>
  );
}