import { Grid, Paper, makeStyles } from "@material-ui/core";
import React from "react";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Controls from "../../Components/Controls/Controls";
import UseForm from "../../Components/UseForm"
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { ENDPOINTS, createAPIEndpoint, empFullNames } from "../../api";
import * as taskService from "../../Services/TaskService";
import { useState,useEffect } from "react";
const statusLevels = [
    { id: "NotStarted", title: "Not Started" },
    { id: "InProgress", title: "In Progress" },
    { id: "Done", title: "Done" },
  ];
const useStyles = makeStyles((theme) => ({
  root: {
      
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
      
    },
    
  },
  paper: {
    padding:theme.spacing(3),
    marginLeft:'7%',
    paddingLeft:theme.spacing(6),
    width:'80%',
  },
  rightGrid:{
    paddingLeft:theme.spacing(5)
  },
  formControl: {
    margin: theme.spacing(1),
  },
  mItems:{
    opacity:0.6,
    borderRadius:'50px',
    '&:hover':{
      opacity:1,
      backgroundColor:'#cde7fa',
      fontWeight:600
    }
  }
}));

export default function TaskForm(props) {
  const projectName=props.projectName;

  const getFreshModel = () =>({
    taskId: 0,
    taskName: "",
    projectName:projectName,
    moduleName:"", 
    taskDescription: "",
    priority: "",
    taskStatus: "Not Started",
    estimatedTime: 10,
    actualTime: 0,
    assignedDevs: "",
});

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("taskName" in fieldValues)
      temp.taskName = fieldValues.taskName ? "" : "This field is required";
    if ("projectName" in fieldValues)
      temp.projectName =
        fieldValues.projectName.length !== 0 ? "" : "This field is required";
    if ("moduleName" in fieldValues)
      temp.moduleName =
        fieldValues.moduleName.length !== 0 ? "" : "This field is required";
    if ("estimatedTime" in fieldValues) {
        if (isNaN(fieldValues.estimatedTime)) {
        temp.estimatedTime = "Estimated time must be a numeric value";
      } else if (fieldValues.estimatedTime < 0) {
        temp.estimatedTime = "Estimated time cannot be negative";
       } else {
         temp.estimatedTime = "";
       }
     }
  
    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = UseForm(getFreshModel);


  const classes = useStyles();


  //const [empFullNames, setEmpFullNames] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5225/api/Employees')
      .then((response) => {
        const employees = response.data;
        const formattedData = employees.map((employee) => {
          return {
            employeeId: employee.employeeId,
            empFullName: employee.empFullName,
            availableHours: employee.availableHours
          };
        });
        setEmployeeData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  }, []);


  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) 
      createAPIEndpoint(ENDPOINTS.ModelTasks)
      .post(values)
      .then(res=>{console.log(res);
         resetForm(); //reset Form
         window.location.reload(); // Refresh the page
        })
      .catch(err =>console.log(err));
    
  };

  return (
    
    <div>
      
      <form onSubmit={handleSubmit} className={classes.root}>
      <Controls.Select
          name="projectName"
          label="Project Name"
          value={values.projectName}
          options={taskService.getProjectsCollection()}
          onChange={handleInputChange}
          error={errors.projectName}
          
        />
        <Controls.Select
          name="moduleName"
          label=" Module"
          value={values.moduleName}
          options={taskService.getModuleCollection()}
          onChange={handleInputChange}
          error={errors.moduleName}
        />
        <Grid container>
          <Grid item xs={6}>
          <Controls.Input
              label="Task Name"
              name="taskName"
              value={values.taskName}
              onChange={handleInputChange}
              error={errors.taskName}
            />
            <Controls.Input
              label="Task Description"
              name="taskDescription"
              value={values.taskDescription}
              onChange={handleInputChange}
            />
            <Controls.Select
              name="priority"
              label="Priority"
              value={values.priority}
              options={taskService.getPriorityCollection()}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} className={classes.rightGrid}>
          
           <Controls.Input
           label="Estimated Time (Hours)"
           name="estimatedTime"
           value={values.estimatedTime}
           onChange={handleInputChange}
           error={errors.estimatedTime}
         />
         
         <FormControl variant='outlined' className={classes.formControl}>
         <InputLabel>Assign Developers</InputLabel>
         <MuiSelect
         label="Assign Developers"
         className={classes.select}
         name="assignedDevs"
         value={values.assignedDevs}
         onChange={handleInputChange}
         >
         <MenuItem value="">None</MenuItem>
        {
                    employeeData.map(
                        item=>(<MenuItem className={classes.mItems} value={item.empFullName}>{item.empFullName}: Available {item.availableHours} hours</MenuItem>)
                    )
                }
      </MuiSelect>
      </FormControl>

         <div className={classes.buttons}>
           <Controls.Button
             varient="outlined"
             text="Reset"
             endIcon={<RestartAltIcon />}
             onClick={resetForm}
           />

           <Controls.Button
             type="submit"
             color="primary"
             text="Add"
             size="large"
             endIcon={<AddIcon />}
           />
         </div>
          </Grid>
        </Grid>
      </form>
      
    </div>
  );
}
