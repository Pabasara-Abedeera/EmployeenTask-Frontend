import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Controls from "../../Components/Controls/Controls";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CloseIcon from '@mui/icons-material/Close'
import PageHeader from '../../Components/PageHeader'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ConfirmDialog from "../../Components/ConfirmDialog";
import SideMenu from "../../Components/SideMenu";
import TaskFormEdit from "./TaskFormEdit";
import {useLocation} from 'react-router-dom'
import axios from "axios";
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
import TaskForm from "./TaskForm";
import SearchIcon from '@mui/icons-material/Search';
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
    marginBottom:theme.spacing(4),
    backgroundColor:'#fff',
  },
  content:{
    margin:theme.spacing(5),
    marginTop:0,
    marginLeft:"20%"
  },
  searchInput: {
    width: "75%",
    '&:hover':{
      backgroundColor:'#e4f7f5'
    }
  },

  button: {
    marginLeft: theme.spacing(65),
  },
  dialogWrapper: {
    padding: theme.spacing(2),
    positions: "absolute",
    top: theme.spacing(3),
  },
  dialogTitle: {
    paddingRight: "0px",
  },
  searchInput: {
    width: "75%",
    '&:hover':{
      backgroundColor:'#e4f7f5'
    }
  },
  greenColumn: {
    backgroundColor: '#9af5a6',

  },
  container:{
    paddingRight:5
  },
  greenRow: {
    backgroundColor: '#9af5a6',
    opacity:"50%"
  },
}));

export default function Task() {
  const location = useLocation();
  const projectName = location.state.projectName;
  const subTitle="Tasks of "+{projectName};
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupEdit, setOpenPopupEdit] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5225/api/ModelTasks/project/${projectName}`
        );
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = (id) => {
    setRecordToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    createAPIEndpoint(ENDPOINTS.ModelTasks)
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
  const handleClosePopupEdit = () => {
    setOpenPopupEdit(false);
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

    <SideMenu/>
    <div className={classes.content}>  
    <PageHeader
      title="Tasks"
      subTitle={projectName}
      icon={<PeopleAltIcon/>}
    />
    <TableContainer component={Paper} style={{ overflowX: "hidden" }} className="container">
    <Toolbar>
          <Controls.Button
            text="Add New Task"
            color="primary"
            startIcon={<ControlPointIcon />}
            onClick={() => {
              setOpenPopup(true);
              
            }}
            className={classes.button}
          />
        </Toolbar>
      <Table className={classes.table} aria-label="Tasks table">
        <TableHead >
          <TableRow style={{backgroundColor:'#0b043d'}}>
            <TableCell >Task Name</TableCell>
            <TableCell >Module</TableCell>
            <TableCell>Assigned Developer</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
            <TableRow key={task.taskId} className={task.taskStatus === 'Done' ? classes.greenRow : ''}>
            <TableCell component="th" scope="row" className={task.taskStatus === 'Done' ? classes.greenColumn: ''}>
              {task.taskName}
            </TableCell>
            <TableCell className={task.taskStatus === 'Done' ? classes.greenColumn: ''}>{task.moduleName}</TableCell>
            <TableCell className={task.taskStatus === 'Done' ? classes.greenColumn: ''}>{task.assignedDevs}</TableCell>
            <TableCell className={task.taskStatus === 'Done' ? classes.greenColumn: ''}>{task.taskStatus}</TableCell>
              <TableCell className={task.taskStatus === 'Done' ? classes.greenColumn: ''}>
                <Controls.ActionButton
                  color="primary"
                  onClick={() => {
                    setOpenPopupEdit(true);
                    setRecordForEdit(task);
                  }}
                  
                >
                  <EditOutlinedIcon fontSize="small" />
                </Controls.ActionButton>
                <Controls.ActionButton
                  color="secondary"
                  onClick={() => handleDelete(task.taskId)} // Call handleDelete with the task ID
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
          count={tasks.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
        />
    </TableContainer>
    <Dialog open={openPopup} onClose={handleClosePopup} maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}>
        <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex" }}>
          <Typography
            align="center"
            variant="h4"
            component="div"
            style={{ flexGrow: 1, opacity: 0.6, fontFamily: "Ubuntu", }}
          >
            Add new Task
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
          <TaskForm projectName={projectName}/>
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
            Edit Task
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
          <TaskFormEdit recordForEdit={recordForEdit}/>
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
