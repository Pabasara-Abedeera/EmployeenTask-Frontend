
import './App.css';
import React from 'react';
import Header from '../Components/NavBar/Navbar-Admin';
import {makeStyles} from '@material-ui/styles'
import Employees from '../Pages/Employees/Employees';
import Task from '../Pages/Tasks/Task';
import Dashboard from '../Pages/Dashboard/AdminDashboard';
import {Route, Routes} from 'react-router-dom'
import Navbar_Admin from '../Components/NavBar/Navbar-Admin';
import Project from '../Pages/Project/Project';
import DevDashboard from '../Pages/Dashboard/DevDashboard';
import EditProfile from '../Pages/Employees/EditProfile';
import { useLocation } from 'react-router-dom';
import AssignedTasks from '../Pages/Tasks/AssignedTasks';
import PMDashboard from '../Pages/Dashboard/PMDashboard';
import EmployeesForPm from '../Pages/Employees/EmployeesForPm';
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
  const location = useLocation();
  const isDeveloperPath = location.pathname === '/Developer';
  const isEditProfilePath = location.pathname.startsWith('/EditProfile');
  const isViewTasksPath = location.pathname.startsWith('/AssignedTasks');

  return (
    <div className={classes.appMain}>
      <React.Fragment>
        {!isDeveloperPath && !isEditProfilePath && !isViewTasksPath && <Navbar_Admin />}
      </React.Fragment>
      <div className={classes.content}>
        <Routes>
          <Route path='/Admin' element={<Dashboard />} />
          <Route path='/Developer' element={<DevDashboard />} />
          <Route path='/Employees' element={<Employees />} />
          <Route path='/Projects' element={<Project />} />
          <Route path='/Task' element={<Task />} />
          <Route path='/EditProfile/:devId' element={<EditProfile />} />
          <Route path='/AssignedTasks/:devName' element={<AssignedTasks />} />
          <Route path='/PM' element={<PMDashboard />} />
          <Route path='/EmpForPm' element={<EmployeesForPm />} />
        </Routes>
      </div>
    </div>
    
  );
}

export default App;
