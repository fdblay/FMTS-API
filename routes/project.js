import { Router } from "express";
import { addProject, assignProjectTo, countProjects, getProject, getProjects, updateProjectStatus } from "../controllers/project.js";
import { getUserProjects } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";


const projectRouter = Router();

projectRouter.post('/projects/add', addProject)

projectRouter.get('/projects', getProjects)

projectRouter.get('/projects/me', isAuthenticated, getUserProjects)

projectRouter.get('/projects/count', countProjects)

projectRouter.get('/projects/:id', getProject)

projectRouter.patch('/projects/:id', updateProjectStatus)

projectRouter.patch('/projects/:id/assignProject', assignProjectTo)



// projectRouter.patch('/projects/:id/assign', assignProjectTo)


export default projectRouter