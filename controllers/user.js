import { BlacklistModel, UserModel } from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginUserValidator, passwordResetValidator, registerUserValidator, updateUserValidator } from "../validators/user.js";
import { mailTransporter } from "../utils/mail.js";
import { ProjectModel } from "../models/project.js";


// Register Users
export const registerUser = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = registerUserValidator.validate(req.body);

        if (error) {
            return res.status(422).json(error);
        }
        // check by email if user already exit 
        const user = await UserModel.findOne({ email: value.email });

        if (user) {
            return res.status(409).json('User already exist!');
        }
        // Hash user password
        const hashPassword = bcryptjs.hashSync(value.password, 10);
        // save user into database
        await UserModel.create({
            ...value,
            password: hashPassword
        });
        // send confirmation email
        await mailTransporter.sendMail({
            to: value.email,
            subject: "User Registeration",
            text: `Welcome! ${value.fullName}, your account has been registered successfully.`
        });
        // Respond to request
        res.json('User Registered!')

    } catch (error) {
        next(error);
    }
}

// Login Users
export const userLogin = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = loginUserValidator.validate(req.body);

        if (error) {
            return res.status(422).json(error);
        }
        // find a registered user with identifier
        const user = await UserModel.findOne({ email: value.email });

        if (!user) {
            return res.status(404).json('User does not exist');
        }
        // compare credentials (user-email and password)
        const correctPassword = bcryptjs.compareSync(value.password, user.password);

        if (!correctPassword) {
            return res.status(401).json('Invalid credentials!');
        }
        // sign a token for user
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }
        );
        // Respond to request
        res.json({
            message: 'Login Successful',
            accessToken: token
        });
    } catch (error) {
        next(error);
    }
}

// Get User Profile
export const getUserProfile = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.auth.id).select({ password: false });

        res.json(user);
    } catch (error) {
        next(error);
    }
}

// Get user projects
export const getUserProjects = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 15, skip = 0 } = req.query

        // user can seach by keyword. Yet to figure out how user can find by category.
        const project = await ProjectModel
        .find({
            ...JSON.parse(filter),
            projectAssignee: req.auth.id
        })
        .sort(JSON.parse(sort))
        .limit(limit)
        .skip(skip);

        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
}

// Update User Profile
export const updateUserProfile = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = updateUserValidator.validate({
            ...req.body,
            avatar: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }

        // Update user
        await UserModel.findByIdAndUpdate(req.auth.id, value);
        // Respond to request
        res.json('User profile updated')
    } catch (error) {
        next(error);
    }
}
// Logout Users
export const userLogout = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided.' })
        }
        // Decode the token to get the expiration date
        const decoded = jwt.decode(token);
        const expiresAt = new Date(decoded.exp * 1000); //Convert to milliseconds

        // Store the token in the blacklist
        await BlacklistModel.create({ token, expiresAt });


        res.json({ message: 'Successfully logged out!' })
    } catch (error) {
        next(error);
    }
}

// Password Reset
export const reqPasswordReset = async (req, res, next) => {
    try {
        const { email } = req.body;
        // Check if user exists by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '20m' });

        // Send email with the reset link containing the token
        await mailTransporter.sendMail({
            to: user.email,
            subject: "Password Reset",
            text: `
            Hello from Freelix!

            Sorry about your password issue, help is here.
            Please use the token below to reset your password.

            ${resetToken}`
        });

        res.json({ message: 'Password reset email sent.' });


    } catch (error) {
        next(error);
    }
}

export const passwordReset = async (req, res, next) => {
    try {
        // const {token, newPassword} = req.body;
        const token = req.headers.authorization.split(" ")[1];
        const {error, value} = passwordResetValidator.validate(req.body)
        if (error) {
            return res.status(422).json(error);
        }
    
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        const user = await UserModel.findById(decoded.id);
    
        if (!user) {
            return res.status(404).json({message: 'Invalid Token'})
        }
    
        // Hash the new password
        const hashedPassword = bcryptjs.hashSync(value.password, 10);
    
        // Update the password in the database
        user.password = hashedPassword;
        await user.save();
    
        res.json({message: 'Password reset successful'});
    } catch (error) {
        next(error);
    }
}

// Remove expired Tokens from the database at intervals
// const removeExpiredTokens = async () => {
//     await BlacklistModel.deleteMany({ expiresAt: { $lt: new Date() } });

//     // Run this at regualar intervals
//     setInterval(removeExpiredTokens, 0.15 * 60 * 60 * 1000);
// }
// Delete Users