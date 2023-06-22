import { Grid, Paper, makeStyles } from "@material-ui/core";
import React from "react";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import Controls from "../../Components/Controls/Controls";
import UseForm from "../../Components/UseForm"
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import InputWithLabel from "../../Components/Controls/InputWithLabel";
import CloseIcon from '@mui/icons-material/Close'
import axios from "axios";
import {TextField} from "@material-ui/core";
import { useState,useEffect } from "react";
const genderItems = [
    { id: "male", title: "Male" },
    { id: "female", title: "Female" },
    { id: "other", title: "Other" },
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
        width:'600px',
        height:'650px',
        paddingLeft:'40px',
        boxShadow:'#fff 2px 2px 17px'
        
    }
}

export default function EditProfile() {

    const navigate=useNavigate();

    const { devId } = useParams();
    const developerId = parseInt(devId, 10);
    const check=developerId+1;
    const[employee,setEmployee]=useState([]);
      
    
    useEffect(() => {
        fetchEmployee();
      }, []);
    
      const fetchEmployee = async () => {
        try {
          const response = await axios.get(`http://localhost:5225/api/Employees/${developerId}`);
          setEmployee(response.data);
        } catch (error) {
          console.log(error);
        }
      };


  const getFreshModel = () =>({
    employeeId: employee.employeeId,
    empFullName: employee.empFullName,
    position:employee.position,
    contactNo:employee.contactNo, 
    email: employee.email,
    address: employee.address,
    workingHours: employee.workingHours,
    availableHours: employee.availableHours,
    gender: employee.gender,
    isPermanent: employee.isPermanent,
});

const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("empFullName" in fieldValues)
      temp.empFullName = fieldValues.empFullName ? "" : "This field is required";
    if ("email" in fieldValues) {
      if (!fieldValues.email) {
        temp.email = "This field is required";
      } else if (!/^$|.+@.+\..+$/.test(fieldValues.email)) {
        temp.email = "Email is not valid";
      } else {
        temp.email = "";
      }
    }
    if ("availableHours" in fieldValues) {
         if (isNaN(fieldValues.availableHours)) {
          temp.availableHours = "Available time must be a numeric value";
        } else if (fieldValues.workingHours < 0) {
          temp.availableHours = "Available time cannot be negative";
        } else {
          temp.availableHours = "";
        }
      }
    if ("contactNo" in fieldValues){
      if(!fieldValues.contactNo){
        temp.contactNo="This Field is required"
      }
      else if(fieldValues.contactNo.length !== 10){
        temp.contactNo="10 digits required"
      }
      else{
        temp.contactNo=""
      }
    }

        
    setErrors({ ...temp });
  
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


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (values.employeeId) {
        // If taskId exists, update the record
        createAPIEndpoint(ENDPOINTS.Employees)
          .update(values.employeeId, values) // Use the taskId as the first argument
          .then((res) => {
            console.log(res);
            resetForm(); // Reset Form
            window.location.reload(); // Refresh the page
          })
          .catch((err) => console.log(err));
      } else {
        // If taskId does not exist, create a new record
        createAPIEndpoint(ENDPOINTS.Employees)
          .post(values)
          .then((res) => {
            console.log(res);
            resetForm(); // Reset Form
            window.location.reload(); // Refresh the page
          })
          .catch((err) => console.log(err));
      }
    }
  };

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
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom:'0' ,marginTop:'20px'}}>
      <h1 style={{ textAlign: 'center' }}>Edit Profile<br/></h1>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom:'10px' ,marginTop:'20px'}}>
    <h3 style={{ textAlign: 'center', marginTop:'4px' }}><br/>{employee.empFullName}</h3>
    </div>
      
      <form onSubmit={handleSubmit} className={classes.root}>
        <Grid container style={{marginLeft:'20px',marginRight:'20px'}}>
        
          <Grid item >
            <Controls.InputWithLabel
              label="Email Address"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              defaultValue={employee.empFullName}
              error={errors.email}
            />
            <Controls.InputWithLabel
              label="Contact Number"
              name="contactNo"
              value={values.contactNo}
              onChange={handleInputChange}
              error={errors.contactNo}
            />
            <Controls.InputWithLabel
              label="Address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />

            <Controls.InputWithLabel
              label="Available Hours"
              name="availableHours"
              value={values.availableHours}
              onChange={handleInputChange}
              error={errors.availableHours}
            />

            <div style={{marginTop:'5px' , marginLeft:'100px'}}>
              <Controls.Button
                varient="outlined"
                onClick={resetForm}
                text="Reset"
                endIcon={<RestartAltIcon />}
              />

              <Controls.Button
                type="submit"
                color="primary"
                text="Edit"
                endIcon={<AddIcon />}
              />
            </div>
          </Grid>
        </Grid>
      </form>
      </Paper>
    </div>
  );
}
