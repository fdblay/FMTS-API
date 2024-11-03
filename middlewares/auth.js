import { expressjwt } from "express-jwt";
import { BlacklistModel, UserModel } from "../models/user.js";
import { permissions } from "../utils/rbac.js";
import { set } from "mongoose";

export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ["HS256"]
});

export const hasPermission = (action) => {
    return async (req, res, next) => {
        try {
            // check if user already exists in db
            const user = await UserModel.findById(req.auth.id);

            // user the user role to find their permission
            const permission = permissions.find(value => value.role === user.role);
            if (!permission) {
                return res.status(403).json('No permission found!')
            }
            // check if permission actions include action
            if (permission.actions.includes(action)) {
                next();
            } else {
                res.status(403).json('Action not allowed!');

            }
        } catch (error) {
            next(error);
        }
    }
}


export const checkBlacklist = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided.' });
        }
        // Check if the token is blacklisted
        const blacklistedToken = await BlacklistModel.findOne({ token });

        if (blacklistedToken) {
            return res.status(401).json({ message: 'Token is invalid or expired.' });
        }
        next();
    } catch (error) {
        next(error)
    }
}

export const removeExpiredTokens = async () => {
    await BlacklistModel.deleteMany({ expiresAt: { $lt: new Date() } });
}

