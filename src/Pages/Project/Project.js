import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Controls from "../../Components/Controls/Controls";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CloseIcon from '@mui/icons-material/Close'
import PageHeader from '../../Components/PageHeader'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SideMenu from "../../Components/SideMenu";
import {
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
import {useNavigate} from 'react-router-dom'
import Task from "../Tasks/Task";

export const projects=[
    {id:'1',name:'Project A' ,status:'In Progress' ,projectManager:'Kamal Perera'},
    {id:'2',name:'Project B',status:'Not Started' ,projectManager:'Nadun Silva'},
    {id:'3',name:'Project C',status:'Not Started' ,projectManager:'Nadun Silva'},
  ]
  

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
    marginLeft:theme.spacing(0)
  },
  content:{
    margin:theme.spacing(7),
    marginTop:0
  },
  searchInput: {
    width: "75%",
    '&:hover':{
      backgroundColor:'#e4f7f5'
    }
  },

  button: {
    marginLeft: theme.spacing(75),
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

export default function Project() {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const[project,setProject]=useState("");
  const navigate=useNavigate();
  
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
      title="Projects"
      subTitle="Projects of G3 Technologies."
      icon={<PeopleAltIcon/>}
    />
    <div className={classes.content}>  
   
    <TableContainer component={Paper} style={{ overflowX: "hidden" }} className="container">
    <Toolbar>
          <Controls.Button
            text="Add New Project"
            color="primary"
            startIcon={<ControlPointIcon />}
            className={classes.button}
          />
        </Toolbar>
      <Table className={classes.table} aria-label="Projects table">
        <TableHead >
          <TableRow style={{backgroundColor:'#0b043d'}}>
            <TableCell >Project Name</TableCell>
            <TableCell >Project Manager</TableCell>
            <TableCell> Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project) => (
            <TableRow key={projects.id}>
            <TableCell component="th" scope="row">
              {project.name}
            </TableCell>
            <TableCell >{project.projectManager}</TableCell>
            <TableCell>{project.status}</TableCell>
              <TableCell>
             <Controls.ActionButton
                  color="warning" 
                  
                  onClick={() => {
                    setProject(project.name);
                    navigate('/Task', { state: { projectName: project.name } })
                  }}
                >
                  < VisibilityIcon fontSize="small" />
                </Controls.ActionButton>
                <Controls.ActionButton
                  color="primary"
        
                >
                  <EditOutlinedIcon fontSize="small" />
                </Controls.ActionButton>
                <Controls.ActionButton
                  color="secondary"
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
          count={projects.length}
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
