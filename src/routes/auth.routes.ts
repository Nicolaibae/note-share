import { Router } from "express";

import { authService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";
import{ authenticateJWT }from "../middleware/auth.middleware"


const router = Router()

const authServices = new authService();
const AuthControllers = new AuthController(authServices)
router.post("/Register",AuthControllers.Register);
router.post("/Login",AuthControllers.Login);
router.post("/RefreshToken",AuthControllers.RefreshToken);
router.post("/Logout",AuthControllers.Logout);
router.get("/profile",authenticateJWT,AuthControllers.Profile)

export default router