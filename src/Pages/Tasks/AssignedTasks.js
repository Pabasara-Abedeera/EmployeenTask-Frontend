import React from 'react'
import { Paper } from '@mui/material'
import { useParams,useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import Controls from "../../Components/Controls/Controls";
import IndividualEmployee from '../Employees/IndividualEmployee'
const styles = {
    body: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      backgroundColor:'#030b30',
      backgroundSize: 'cover',
      overflowX: 'hidden',
      display: 'flex',
    justifyContent: 'center',
     alignItems: 'center',
    height: '100vh',
    },
    paper:{
        width:'880px',
        height:'550px',
        paddingLeft:'40px',
        boxShadow:'#fff 2px 2px 17px'
        
    },
}

export default function AssignedTasks() {
    const navigate=useNavigate();
    const {devName}=useParams();
  return (
    <div style={styles.body}>
        <div style={{
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: "10px",
    marginRight: "10px",
  }}> 
  <Controls.ActionButton
  color="secondary"
  onClick={() => {
    navigate('/Developer')
  }}
>
  <CloseIcon />
</Controls.ActionButton></div>
      <Paper style={styles.paper}>
      <div style={{  marginBottom:'0' ,marginTop:'20px'}}>
      <h1 style={{ textAlign: 'center' }}>Assigned Tasks<br/></h1>
    </div>
    <div style={{ marginBottom:'10px' ,marginTop:'0px'}}>
    <h3 style={{ textAlign: 'center', marginTop:'0px' }}><br/>{devName}</h3>
    </div>
        <IndividualEmployee individualEmployee={devName}/>

      </Paper>
    </div>
  )
}
