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
  }
}));

export default function Employees() {
  const classes = useStyles();

  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupTask, setOpenPopupTask] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [individualEmployee, setIndividualEmployee] = useState(null);
  const [recordForEdit, setRecordForEdit] = useState([]);
  const [openPopupEdit, setOpenPopupEdit] = useState(false);
  
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

  const handleDelete = (id) => {
    setRecordToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    createAPIEndpoint(ENDPOINTS.Employees)
      .delete(recordToDelete)
      .then((res) => {
        // Handle successful deletion
        console.log('Record deleted successfully');
        setRecordToDelete(null);
        setConfirmDialogOpen(false);
        window.location.reload(); // Refresh the page
      })
      .catch((err) => {
        // Handle deletion error
        console.error('Error deleting record:', err);
        setRecordToDelete(null);
        setConfirmDialogOpen(false);
      });
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
  };


  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleClosePopupTask = () => {
    setOpenPopupTask(false);
  };
  const handleClosePopupEdit = () => {
    setOpenPopupTask(false);
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
    <Toolbar>
        <div style={{marginLeft:"40%", marginTop:"1%"}}>
          <Controls.Button
            text="Add New Employee"
            color="primary"
            startIcon={<ControlPointIcon />}
            onClick={() => {
              setOpenPopup(true);
              //setRecordForEdit(null);
            }}
            className={classes.button}
          />
          </div>
        </Toolbar>
      <Table className={classes.table} aria-label="Employee table">
        <TableHead >
          <TableRow style={{backgroundColor:'#0b043d'}}>
            <TableCell >Name</TableCell>
            <TableCell >Position</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Available Hours</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
            <TableRow key={employee.employeeId}>
              <TableCell component="th" scope="row">
                {employee.empFullName}
              </TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.availableHours}</TableCell>
              <TableCell>
                <Controls.ActionButton
                  color="warning" 
                  onClick={() => {
                    setOpenPopupTask(true);
                    setIndividualEmployee(employee.empFullName);
                  }}
                >
                  < VisibilityIcon fontSize="small" />
                </Controls.ActionButton>
                <Controls.ActionButton
                  color="primary"
                  onClick={() => {
                    setOpenPopupEdit(true);
                    setRecordForEdit(employee);
                  }}
                  
                >
                  <EditOutlinedIcon fontSize="small" />
                </Controls.ActionButton>
                <Controls.ActionButton
                  color="secondary"
                  onClick={() => handleDelete(employee.employeeId)} // Call handleDelete with the employee ID
                >
                  <CloseIcon fontSize="small" />
                </Controls.ActionButton>
              </TableCell>
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
    <Dialog open={openPopup} onClose={handleClosePopup} maxWidth="md"
      classes={{ paper: classes.dialogWrapper }} style={{backgroundColor:'rgba(125,155,255,0.4)'}}>
        <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex" }}>
          <Typography
            align="center"
            variant="h4"
            component="div"
            style={{ flexGrow: 1, opacity: 0.6, fontFamily: "Ubuntu", }}
          >
            Add new Employee
          </Typography>


          <Controls.ActionButton
            color="secondary"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
        <DialogContent>
          <EmployeeForm />
        </DialogContent>
      </Dialog>

       {/*popup for edit */}

       <Dialog open={openPopupEdit} onClose={handleClosePopupEdit} maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}>
        <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex" }}>
          <Typography
            align="center"
            variant="h4"
            component="div"
            style={{ flexGrow: 1, opacity: 0.6, fontFamily: "Ubuntu", }}
          >
            Edit employee
          </Typography>


          <Controls.ActionButton
            color="secondary"
            onClick={() => {
              setOpenPopupEdit(false);
            }}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
        <DialogContent>
          <EmployeeEdit recordForEdit={recordForEdit}/>
        </DialogContent>
      </Dialog>

      <Dialog open={openPopupTask} onClose={handleClosePopupTask} maxWidth="md"
      classes={{ paper: classes.dialogWrapper }} style={{backgroundColor:'rgba(122,235,219,0.4)'}}>
        <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex" , marginBottom:0}}>
          <Typography
            align="center"
            variant="h4"
            component="div"
            style={{ flexGrow: 1, opacity: 0.6, fontFamily: "Ubuntu", }}
          >
            {individualEmployee}<br/> <p style={{fontSize:'20px'}}>Assigned Tasks</p>
          </Typography>
            

          <Controls.ActionButton
            color="secondary"
            onClick={() => {
              setOpenPopupTask(false);
            }}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
        <DialogContent style={{ paddingTop: 0 }}>
          <IndividualEmployee individualEmployee={individualEmployee}/>
        </DialogContent>
      </Dialog>


      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
    </div>
  );
}
