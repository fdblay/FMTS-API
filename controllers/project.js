import { ProjectModel } from "../models/project";
import { createProjectValidator } from "../validators/project.js"


export const addProject = async (req, res, next) => {
    try {
        // validate user input
        const {error, value} = createProjectValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // create new project 
        await ProjectModel.create({
            ...value, 
            projectAssignee: req.auth.id
        });
        // response
        res.status(201).json('Project created successfully')
    } catch (error) {
        next(error)
    }
}

export const getProject = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}

export const getProjects = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}

export const updateProjectStatus = async (req, res, next) => {
try {
    
} catch (error) {
    next(error);
}
}

export const assignProject = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}