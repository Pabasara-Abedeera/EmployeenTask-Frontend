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
const genderItems = [
    { id: "male", title: "Male" },
    { id: "female", title: "Female" },
    { id: "other", title: "Other" },
  ];
  
  export const positions=[
    {id:'1',title:'Project Manager'},
    {id:'2',title:'Senior Developer'},
    {id:'3',title:'UI/UX Designer'},
    {id:'4',title:'Developer'},
    {id:'5',title:'Intern'}
  ]
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

export default function EmployeeEdit(props) {

  const {recordForEdit}=props;

  const getFreshModel = () =>({
    employeeId: recordForEdit.employeeId,
    empFullName: recordForEdit.empFullName,
    position:recordForEdit.position,
    contactNo:recordForEdit.contactNo, 
    email: recordForEdit.email,
    address: recordForEdit.address,
    workingHours: recordForEdit.workingHours,
    availableHours: recordForEdit.availableHours,
    gender: recordForEdit.gender,
    isPermanent: recordForEdit.isPermanent,
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
    
    if ("workingHours" in fieldValues) {
      if (!fieldValues.workingHours) {
        temp.workingHours = "Estimated time is required";
      } else if (isNaN(fieldValues.workingHours)) {
        temp.workingHours = "Estimated time must be a numeric value";
      } else if (fieldValues.workingHours < 0) {
        temp.workingHours = "Estimated time cannot be negative";
      } else {
        temp.workingHours = "";
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

          
    if ("position" in fieldValues)
      temp.position =
        fieldValues.position.length !== 0 ? "" : "This field is required";
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
    
    <div>
      
      <form onSubmit={handleSubmit} className={classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <Controls.Input
              label="Full Name"
              name="empFullName"
              value={values.empFullName}
              onChange={handleInputChange}
              error={errors.empFullName}
            />
            <Controls.Input
              label="Email Address"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Controls.Input
              label="Contact Number"
              name="contactNo"
              value={values.contactNo}
              onChange={handleInputChange}
              error={errors.contactNo}
            />
            <Controls.Input
              label="Address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} className={classes.rightGrid}>

          <Controls.Input
              label="Working Hours"
              name="workingHours"
              value={values.workingHours}
              onChange={handleInputChange}
              error={errors.workingHours}
            />
            <Controls.Input
              label="Available Hours"
              name="availableHours"
              value={values.availableHours}
              onChange={handleInputChange}
              error={errors.availableHours}
            />
            <Controls.Select
              name="position"
              label="Position"
              options={positions}
              value={values.position}
              onChange={handleInputChange}
              error={errors.position}
            />

            

            <Controls.CheckBox
              label="Permanent Employee"
              name="isPermanent"
              value={values.isPermanent}
              onChange={handleInputChange}
            />
            <div>
              <Controls.Button
                varient="outlined"
                onClick={resetForm}
                text="Reset"
                endIcon={<RestartAltIcon />}
              />

              <Controls.Button
                type="submit"
                color="primary"
                text="edit"
                endIcon={<AddIcon />}
              />
            </div>
          </Grid>
        </Grid>
      </form>
      
    </div>
  );
}
