import Joi from "joi";


// Custom validation function for ObjectId
const isValidObjectId = (value, helpers) => {
    if (!ObjectId.isValid(value))
    {
        return helpers.error("any.invalid", {message: `Invalid ObjectId: ${value}`});
    }
    return value;
};

export const addProposalValidator = Joi.object({
    title: Joi.string().required(),

    details: Joi.string(). required(),

    createdBy: Joi.custom(isValidObjectId),

    projectId: Joi.custom(isValidObjectId),

    attachments: Joi.array().items(
        Joi.object({
            filename: Joi.string().required(),

            url: Joi.string().url().required(),

            uploadedAt: Joi.date().default(() => new Date(), 'current date')
        }).required()
    )
})

export const updateProposalValidator = Joi.object({
    title: Joi.string(),

    details: Joi.string(). required(),

    createdBy: Joi.custom(isValidObjectId),

    projectId: Joi.custom(isValidObjectId),

    attachments: Joi.array().items(
        Joi.object({
            filename: Joi.string(),

            url: Joi.string().url(),

            uploadedAt: Joi.date().default(() => new Date(), 'current date')
        })
    )
})