
import './App.css';
import React from 'react';
import Header from '../Components/Navbar';
import {makeStyles} from '@material-ui/styles'
import Employees from '../Pages/Employees/Employees';
import Task from '../Pages/Tasks/Task';
import Dashboard from '../Pages/Dashboard/Dashboard';
import {Route, Routes} from 'react-router-dom'
import Navbar from '../Components/Navbar';
import Project from '../Pages/Project/Project';
const useStyle=makeStyles((theme)=>({
  appMain:{
    width:'100%',
    bottom:0,
  },
  content :{
        marginTop:theme.spacing(0)
        
  }
}))

function App() {
  const classes=useStyle();


  return (
    <div className={classes.appMain}>
      <React.Fragment>
          <Navbar/>
      </React.Fragment>
      <div className={classes.content}>
    <Routes>
      <Route path='/' element={<Dashboard/>}  />
      <Route path='/Employees' element={<Employees/>}  />
      <Route path='/Projects' element={<Project/>}  />
      <Route path='/Task' element={<Task/>}  />

    </Routes>
      </div>
      </div>
    
  );
}

export default App;
