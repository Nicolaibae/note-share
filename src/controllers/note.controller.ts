import { Request, Response } from "express";
import { noteService } from "../services/note.service";

export class noteController {
    #noteService: noteService
    constructor(private readonly noteService: noteService) {
        this.#noteService = noteService
    }
    createNote = async(req: Request, res: Response): Promise<void>=>{

    }

}