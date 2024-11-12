import { Router } from "express";
import { addTask, getTasks, updateTaskStatus, updateTimeLog } from "../controllers/task.js";

const taskRouter = Router();

taskRouter.post('/tasks/add', addTask)

taskRouter.get('/tasks', getTasks)

taskRouter.patch('/tasks/:id/log-hours', updateTimeLog)

taskRouter.patch('/tasks/:id/update', updateTaskStatus)



export default taskRouter;