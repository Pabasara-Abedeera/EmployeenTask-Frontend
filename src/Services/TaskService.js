
import axios from "axios";

export const BASE_URL = "http://localhost:5225/";


//EndPoits are the end part of the url
//ex:http://localhost:5225/api/Employees
export const ENDPOINTS={
    Employees:"Employees",
    ModelTasks:"ModelTasks"
}

const KEYS={
    tasks:'tasks',
    taskId:'taskId'
}


export const getPriorityCollection=()=>[
    {id:'1',title:'High'},
    {id:'2',title:'Medium'},
    {id:'3',title:'Low'}]

export const getProjectsCollection=()=>[
    {id:'1',title:'Project A'},
    {id:'2',title:'Project B'},
    {id:'3',title:'Project C'},
    {id:'4',title:'Project D'},
    {id:'6',title:'Project E'}
]
export const getEmployeesCollection=()=>[
    {id:'1',title:'Amal Perera'},
    {id:'2',title:'Kaml Silva'},
    {id:'3',title:'Thamara Kumari'},
    {id:'4',title:'Sanduni Gamage'},
    {id:'6',title:'Minushika Kapuwatta'}
]

export const getModuleCollection=()=>[
    {id:'1',title:'Customer Module'},
    {id:'2',title:'Admin Module'},
    {id:'3',title:'Developer Module'},
]

export const fetchEmployees = () => {
    return axios.get(BASE_URL + "api/" + ENDPOINTS.Employees);
  };
