import { Router } from "express";
import { noteService } from "../services/note.service";
import { noteController } from "../controllers/note.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router()
const noteServices = new noteService()
const noteControllers = new noteController(noteServices)

router.post("/createNote",authenticateJWT,noteControllers.createNote)