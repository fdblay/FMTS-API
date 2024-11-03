import Joi from "joi";

export const createProjectValidator = Joi.object({
    projectName: Joi.string().required(),

    projectBrief: Joi.string().required(),

    projectRequirement: Joi.string().required()
})

export const updateProjectStatusValidator = Joi.object({
    projectStatus: Joi.string()
    
})

export const projectAssigneeValidator = Joi.object({
    projectAssignee: objectId().required()
})