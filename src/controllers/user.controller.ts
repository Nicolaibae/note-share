import { Request, Response } from "express";
import { UserService } from "../services/user.service";


export class UserController {
  #userService: UserService;

  constructor(private readonly userService: UserService) {
    this.#userService = userService;
  }

  getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.#userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {

      const newUser = await this.#userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error: unknown) {
      res.status(400).json({ message: (error as Error).message });
    }
  };
  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id
      if (!id) throw new Error("User ID is required")
      const updateUsers = await this.#userService.updateUser(req.body, id)
      res.status(201).json(updateUsers)
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
  deleteUser = async (req: Request, res: Response): Promise<void> =>{
    try {
      const id = req.params.id
      if (!id) throw new Error("User ID is required")
        const deleteUser = await this.#userService.deleteUser(id)
      res.status(200).json(deleteUser)
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
