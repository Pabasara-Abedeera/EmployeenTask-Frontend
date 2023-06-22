import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Controls from "../../Components/Controls/Controls";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CloseIcon from '@mui/icons-material/Close'
import PageHeader from '../../Components/PageHeader'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ConfirmDialog from "../../Components/ConfirmDialog";
import VisibilityIcon from '@mui/icons-material/Visibility';
import IndividualEmployee from "./IndividualEmployee";
import EmployeeEdit from "./EmployeeEdit";
import {
  TextField,
  Typography,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  InputAdornment
} from "@mui/material";
import EmployeeForm from "./EmployeeForm";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ControlPointIcon  from "@mui/icons-material/ControlPoint";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import { TablePagination } from "@material-ui/core";

const useStyles = makeStyles(theme=>({
  table: {
    width:"90%",
    margin:theme.spacing(4),
    
    '& .MuiTableCell-head':{
      color:'white',
      cursor:'pointer',
      '&:hover':{
        color:'#c2e6f0',
      }
    },
    "& tbody tr:nth-child(even)": {
      backgroundColor: "#ebecf7",
    }
  },
  root:{
    backgroundColor:'#fff',
    marginTop:"0px",
    '.MuiTableRow-root':{
        color:"red"
    }
  },
  content:{
    margin:theme.spacing(5)
  },
  searchInput: {
    width: "75%",
    '&:hover':{
      backgroundColor:'#e4f7f5'
    }
  },

  button: {
    marginLeft: theme.spacing(10),
  },
  dialogWrapper: {
    width:'700px',
    padding: theme.spacing(2),
    positions: "absolute",
    top: theme.spacing(3),
  },
  dialogTitle: {
    marginBottom:0,
  },
  searchInput: {
    width: "75%",
    '&:hover':{
      backgroundColor:'#e4f7f5'
    }
  },
}));

export default function EmployeesForPm() {
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchEmployees();
  }, []);
  
  const fetchEmployees = () => {
    createAPIEndpoint(ENDPOINTS.Employees)
      .fetch()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.log(err));
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
    <PageHeader
      title="Employees"
      subTitle="Employees of G3 Technologies."
      icon={<PeopleAltIcon/>}
    />
    <div className={classes.content}>
      
    <TableContainer component={Paper} style={{ overflowX: "hidden" }}>
      <Table className={classes.table} aria-label="Employee table">
        <TableHead >
          <TableRow style={{backgroundColor:'#0b043d'}}>
            <TableCell >Name</TableCell>
            <TableCell >Position</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Available Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
            <TableRow key={employee.employeeId} hei>
              <TableCell component="th" scope="row">
                {employee.empFullName}
              </TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.availableHours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
          component="div"
          count={employees.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
        />
    </TableContainer>
    </div>
    </div>
  );
}
