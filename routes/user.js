import { Router } from "express";
import { getUserProfile, registerUser, updateUserProfile, userLogin, userLogout } from "../controllers/user.js";
import { checkBlacklist, isAuthenticated } from "../middlewares/auth.js";
import { userAvatarUpload } from "../middlewares/upload.js";

const userRouter = Router();

userRouter.post('/users/register', registerUser)

userRouter.post('/users/login', userLogin)

userRouter.get('/users/me', isAuthenticated, checkBlacklist, getUserProfile)

userRouter.patch('/users/me', isAuthenticated, userAvatarUpload.single('avatar'), updateUserProfile)

userRouter.post('/users/logout', isAuthenticated, userLogout)


export default userRouter;