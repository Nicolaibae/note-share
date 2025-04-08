import { Request, Response } from "express";
import { noteService } from "../services/note.service";

export class noteController {
    #noteService: noteService
    constructor(private readonly noteService: noteService) {
        this.#noteService = noteService
    }
    createNote = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = (req as any).user
            const result = await this.#noteService.createNote(req.body, userId)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
    allNote = async (req: Request, res: Response): Promise<void> => {
        try {
            const allnote = await this.#noteService.allNote()
            res.status(200).json(allnote)
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
    noteById = async (req: Request, res: Response): Promise<void> => {
        try {
            const noteid = req.params.id
            const userToken = (req as any).user
            const noteId = await this.#noteService.noteById(noteid,userToken)

            res.status(200).json(noteId)
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
    updateNote = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const data = req.body;

            if (!id) throw new Error("Note ID is required");
            if (!data) throw new Error("Data is required");


            const noteId = await this.#noteService.updateNote(data, id);

            res.status(200).json(noteId)
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
    deleteNote = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;

            if (!id) throw new Error("Note ID is required");

            const noteId = await this.#noteService.deleteNote(id);

            res.status(200).json(noteId)
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

}