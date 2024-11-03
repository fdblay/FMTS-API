import Joi from "joi";

export const registerUserValidator = Joi.object({
    fullName: Joi.string()
        .required(),

    // userName: Joi.string()
    //     .alphanum()
    //     .min(3)
    //     .max(30)
    //     .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required(),
    // .pattern(new ReqExp('^[a-zA-Z0-0]{3,30}$')),

    repeat_password: Joi.any()
        .valid(Joi.ref('password'))
        .required()
        .messages({ 'any.only': 'Passwords do not match' }),

    // phone: Joi.string()
    //     .required(),

    // personalID: Joi.string()
    // .alphanum()
    // .required(),

    role: Joi.string()
    .valid('user', 'freelancer', 'manager', 'admin')
    
})

// .with('password', 'repeat_password');


export const loginUserValidator = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required()
});

export const updateUserValidator = Joi.object({
    fullName: Joi.string(),
    avatar: Joi.string(),
});
