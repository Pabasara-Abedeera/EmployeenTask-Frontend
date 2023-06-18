import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Controls from "../../Components/Controls/Controls";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CloseIcon from '@mui/icons-material/Close'
import PageHeader from '../../Components/PageHeader'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ConfirmDialog from "../../Components/ConfirmDialog";
import SideMenu from "../../Components/SideMenu";

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
import SearchIcon from '@mui/icons-material/Search';
import ControlPointIcon  from "@mui/icons-material/ControlPoint";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import { TablePagination } from "@material-ui/core"; 
import axios from "axios";

const useStyles = makeStyles(theme=>({
  table: {
    width:"90%",
    margin:theme.spacing(1),

    
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
    marginTop:0,
    marginBottom:theme.spacing(4)
  },
  content:{
    margin:theme.spacing(5),
    marginLeft:"5%"
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
  greenRow: {
    backgroundColor: '#9af5a6',
    opacity:"50%"
  },
  container:{
    width:"300px"
  }
}));

export default function IndividualEmployee(props) {

  const individualEmployee =props.individualEmployee;

  const classes = useStyles();

  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  

  useEffect(() => {
    const fetchModelTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5225/api/ModelTasks/assignedDevs/${individualEmployee}`
        );
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchModelTasks();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      
  
    <div className={classes.content}>  
    <TableContainer style={{ overflowX: "hidden" }} className={classes.container}>
    <Toolbar>
        </Toolbar>
      <Table className={classes.table} aria-label="Tasks table" style={{marginTop:0}} >
        <TableHead >
          <TableRow style={{backgroundColor:'#128777'}}>
            <TableCell >Task Name</TableCell>
            <TableCell >Project</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
            <TableRow key={task.taskId}>
            <TableCell component="th" scope="row" >
              {task.taskName}
            </TableCell>
            <TableCell >{task.projectName}</TableCell>
            <TableCell >{task.taskStatus}</TableCell>
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
    </div>
    </div>
  );
}
