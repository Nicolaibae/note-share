import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

router.get("/getUsers", userController.getUsers);
router.post("/createUser", userController.createUser);
router.post("/updateUser/:id",userController.updateUser);
router.delete("/deleteUser/:id",userController.deleteUser);
export default router;
