import { Grid, Paper, makeStyles } from "@material-ui/core";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Controls from "../../Components/Controls/Controls";
import UseForm from "../../Components/UseForm"
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { ENDPOINTS, createAPIEndpoint } from "../../api";

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
  }
}));
const getFreshModel = () =>({
  employeeId: 0,
  empFullName: "",
  position: "",
  contactNo: "",
  email: "",
  address: "",
  workingHours: 35,
  availableHours:35,
  gender: "Female",
  isPermanent: false,
});
export default function EmployeeForm() {

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
        temp.workingHours = "Working Hours is required";
      } else if (isNaN(fieldValues.workingHours)) {
        temp.workingHours = "Working Hours must be a numeric value";
      } else if (fieldValues.workingHours < 0) {
        temp.workingHours = "Working Hours cannot be negative";
      } else {
        temp.workingHours = "";
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
    if (validate()) 
      createAPIEndpoint(ENDPOINTS.Employees)
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
            <Controls.Input
              label="Working Hours"
              name="workingHours"
              value={values.workingHours}
              onChange={handleInputChange}
              error={errors.workingHours}
            />
          </Grid>
          <Grid item xs={6} className={classes.rightGrid}>
          <Controls.RadioGroup
              name="gender"
              label="Gender"
              value={values.gender}
              onChange={handleInputChange}
              items={genderItems}
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
                text="Add"
                endIcon={<AddIcon />}
              />
            </div>
          </Grid>
        </Grid>
      </form>
      
    </div>
  );
}
