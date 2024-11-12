import { Router } from "express";
import { getUserProfile, passwordReset, registerUser, reqPasswordReset, updateUserProfile, userLogin, userLogout } from "../controllers/user.js";
import { checkBlacklist, isAuthenticated } from "../middlewares/auth.js";
import { userAvatarUpload } from "../middlewares/upload.js";

const userRouter = Router();

userRouter.post('/users/register', registerUser)

userRouter.post('/users/login', userLogin)

userRouter.get('/users/me', isAuthenticated, checkBlacklist, getUserProfile)

userRouter.patch('/users/me', isAuthenticated, userAvatarUpload.single('avatar'), updateUserProfile)

userRouter.post('/users/logout', isAuthenticated, userLogout)

userRouter.post('/users/request/password-reset', reqPasswordReset)

userRouter.post('/users/password-reset', passwordReset)


export default userRouter;