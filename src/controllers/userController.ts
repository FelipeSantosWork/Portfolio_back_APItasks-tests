import { Request, Response } from "express";
import { UserService } from "../services";

export class UserController {
    private service = new UserService;

    public create = async (req: Request, res: Response): Promise<Response> => {
        const user = await this.service.create(req.body);
        return res.status(201).json(user);
    };
    public list = async (req: Request, res: Response): Promise<Response> => {
        const users = await this.service.list();
        return res.status(200).json(users);
    }
    public retrieve = async (req: Request, res: Response): Promise<Response> => {
        const userId = res.locals.decoded.id;
        const user = await this.service.retrieve(userId);
        return res.status(200).json(user);
    }

}
export const userController = new UserController();