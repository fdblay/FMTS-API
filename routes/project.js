import { Router } from "express";
import { addProject, countProjects, getProject, getProjects, updateProjectStatus } from "../controllers/project.js";

const projectRouter = Router();

projectRouter.post('/projects/add', addProject)

projectRouter.get('/projects', getProjects)

projectRouter.get('/projects/count', countProjects)

projectRouter.get('/projects/:id', getProject)

projectRouter.patch('/projects/:id', updateProjectStatus)

// projectRouter.patch('/projects/:id/assign', assignProjectTo)


export default projectRouter