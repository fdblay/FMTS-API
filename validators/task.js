import Joi from "joi";

export const addTaskValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    createdBy: Joi.string()
})

export const updateTaskStatusValidator = Joi.object({
    status: Joi.string().required(),
})

export const updateTimeLogValidator =Joi.object({
    hoursLogged: Joi.number()
})