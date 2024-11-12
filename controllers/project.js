import { ProjectModel } from "../models/project.js";
import { createProjectValidator, projectAssigneeValidator, updateProjectStatusValidator } from "../validators/project.js"


export const addProject = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = createProjectValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // create new project 
        await ProjectModel.create({
            ...value
            // projectAssignee: req.auth.id
        });
        // response
        res.status(201).json('Project created successfully')
    } catch (error) {
        next(error)
    }
}

export const getProject = async (req, res, next) => {
    try {
        const { id } = req.params.id

        const project = await ProjectModel.findById(id).populate('projectAssignee', 'fullName');

        res.status(200).json(project)
    } catch (error) {
        next(error);
    }
}

export const getProjects = async (req, res, next) => {
    try {
        const {
            filter = "{}", sort = "{}", limit = 10, skip = 0
        } = req.query;

        // Fetch Projects from database
        const projects = await ProjectModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip)
            .populate('projectAssignee', 'fullName');

        // Return response
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
}

export const countProjects = async (req, res, next) => {
    try {
        const { filter = "{}" } = req.query;

        // count projects in database
        const count = await ProjectModel.countDocuments(JSON.parse(filter));

        // Respond to request
        res.json({ count });
    } catch (error) {
        next(error);
    }
}

export const updateProjectStatus = async (req, res, next) => {
    try {
        const status = [
            'Open',
            'In Progress',
            'Review',
            'Completed',
            'Closed'
        ];

        // const { projectStatus } = req.body;
        // validating user input
        const { error, value } = updateProjectStatusValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        // find project by id
        const project = await ProjectModel.findById(req.params.id);
        if (!project) {
            return res.status(404).json("Project not found!")
        }

        // Check if the requested status is the next logical status from the current one
        const currentStatusIndex = status.indexOf(project.projectStatus);
        const newStatusIndex = status.indexOf(value.projectStatus);

        if (newStatusIndex !== currentStatusIndex + 1) {
            return res.status(400).json({
                message: `can't move from ${project.projectStatus} to ${value.projectStatus}. Follow the order`
            })
        }
        // Update project status
        await ProjectModel.findByIdAndUpdate(req.params.id, value);

        res.status(200).json("Project Status Updated Successfully!")

    } catch (error) {
        next(error);
    }
}

export const assignProjectTo = async (req, res, next) => {
    try {
        // const {id} = req.body;
        const { error, value } = projectAssigneeValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        const project = await ProjectModel.findByIdAndUpdate(
            req.params.id,
            value,
            { new: true }

        );

        if (!project) {
            return res.status(404).json({ message: 'Project not found' })
        }
        res.json(project);
    } catch (error) {
        next(error);
    }
}