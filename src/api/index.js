import axios from "axios";

export const BASE_URL = "http://localhost:5225/";
export const empFullNames = "empFullNames";

//EndPoits are the end part of the url
//ex:http://localhost:5225/api/Employees
export const ENDPOINTS={
    Employees:"Employees",
    ModelTasks:"ModelTasks",
    Projects:"Projects"

}

export const createAPIEndpoint = (endpoint) => {
  let url = BASE_URL + "api/" + endpoint + "/";
  return {
    fetch: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    post: (newRecord) => axios.post(url, newRecord),
    update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
    fetchEmpNames:() => axios.get(url+empFullNames),
    fetchEmpTasks:(empFullName) => axios.get(url+"assignedDevs/"+empFullName),
    
  };
  };
