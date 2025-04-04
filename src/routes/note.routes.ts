import { Router } from "express";
import { noteService } from "../services/note.service";
import { noteController } from "../controllers/note.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router()
const noteServices = new noteService()
const noteControllers = new noteController(noteServices)

router.post("/createNote",authenticateJWT,noteControllers.createNote)
router.get("/allNote",authenticateJWT,noteControllers.allNote)
router.get("/noteId/:id",authenticateJWT,noteControllers.noteById)
router.post("/updateNote/:id",authenticateJWT,noteControllers.updateNote)
router.delete("/deleteNote/:id",authenticateJWT,noteControllers.deleteNote)

export default router