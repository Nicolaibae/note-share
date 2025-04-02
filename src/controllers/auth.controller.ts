import { Request, Response } from "express";
import { authService } from "../services/auth.service";


export class AuthController {
    #authService: authService
    constructor(private readonly authService: authService) {
        this.#authService = authService;
    }

    Register = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.body) throw new Error("không có dữ liệu gửi lên")
            const data = await this.#authService.Register(req.body)
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
    Login = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.body) throw new Error("không có dữ liệu gửi lên")
            const data = await this.#authService.Login(req.body)
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
    RefreshToken = async(req: Request, res: Response): Promise<void> =>{
        try {
            if (!req.body) throw new Error("không có dữ liệu gửi lên")
            const data = await this.#authService.RefreshToken(req.body)
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
    Logout = async(req: Request, res: Response): Promise<void> =>{
        try {
            if (!req.body) throw new Error("không có dữ liệu gửi lên")
                const data = await this.#authService.Logout(req.body)
                res.status(200).json(data)
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
    Profile = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await this.#authService.Profile((req as any).user)
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    };
    
}