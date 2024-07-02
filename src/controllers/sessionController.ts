import { Request, Response } from "express";
import { SessionService } from "../services";

export class SessionController {
    private service = new SessionService;

    public login = async (req: Request, res: Response): Promise<Response> => {
        const user = await this.service.login(req.body);
        return res.status(200).json(user);
    };

}
export const sessionController = new SessionController();