import { Router } from "express";

import { authService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";
import{ authenticateJWT }from "../middleware/auth.middleware"
import { UserService } from "../services/user.service";


const router = Router()
const userServices = new UserService()
const authServices = new authService(userServices);
const AuthControllers = new AuthController(authServices)
router.post("/Register",AuthControllers.Register);
router.post("/Login",AuthControllers.Login);
router.post("/RefreshToken",AuthControllers.RefreshToken);
router.post("/Logout",AuthControllers.Logout);
router.get("/profile",authenticateJWT,AuthControllers.Profile)

export default router