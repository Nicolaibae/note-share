import { Request, Response } from "express";
import { ShareService } from "../services/share.service";
export class shareController{
    constructor(private readonly shareService: ShareService) {}
    Share = async(req: Request, res: Response): Promise<void> => {
        try {
            const userToken = (req as any).user?.id
            const {userSharebyid, idNote} = req.body
            const result = await this.shareService.share({
                userToken,
                userSharebyid,
                idNote
            })
                res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
    checkShare = async(req: Request, res: Response): Promise<void> => {
        try {
            const idUser = (req as any).user?.id;
            const { idNote } = req.body;
            const result = await this.shareService.checkshare({
              idNote,
              idUser,
            });
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
}