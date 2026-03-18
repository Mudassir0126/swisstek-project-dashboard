import axios from "axios"

/*
Base URL of our fake backend (JSON Server)
Later you only change this to Spring Boot API
*/
const API_URL = "http://localhost:3001/projects"

/*
Fetch all projects from the API
GET /projects
*/
export const getProjects = async () => {

const res = await axios.get(API_URL)

return res.data

}

/*
Create a new project
POST /projects
*/
export const createProject = async (project) => {

const res = await axios.post(API_URL,project)

return res.data

}

/*
Update an existing project
PUT /projects/{id}
*/
export const updateProject = async (id,data) => {

const res = await axios.put(`${API_URL}/${id}`,data)

return res.data

}