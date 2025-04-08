import { Router } from "express";
import { ShareService } from "../services/share.service";
import { shareController } from "../controllers/share.controller";
import { authenticateJWT } from "../middleware/auth.middleware";
const router = Router()
const shareServices = new ShareService
const shareControllers = new shareController(shareServices)
router.post("/note", authenticateJWT, shareControllers.Share)
router.post("/check-note", authenticateJWT, shareControllers.checkShare)

export default router