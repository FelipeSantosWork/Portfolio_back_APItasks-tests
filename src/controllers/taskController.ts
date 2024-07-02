import { Request, Response } from "express";
import { TaskService } from "../services";

export class TaskController {
    private service = new TaskService;

    public create = async (req: Request, res: Response): Promise<Response> => {
        const task = await this.service.create(req.body);
        return res.status(201).json(task);
    };
    public list = async (req: Request, res: Response): Promise<Response> => {
        const categoryName = req.query.category;
        const userId = res.locals.user.id;
        const tasksByName = await this.service.list(categoryName as string, userId as number);

        return res.status(200).json(tasksByName);
    };
    public listById = async (req: Request, res: Response): Promise<Response> => {
        const id = Number(req.params.taskId);
        const tasks = await this.service.listById(id);
        return res.status(200).json(tasks);
    };
    public update = async (req: Request, res: Response): Promise<Response> => {
        const id = Number(req.params.taskId);
        const updateTask = await this.service.update(id, req.body);
        return res.status(200).json(updateTask)

    };

    public delete = async (req: Request, res: Response): Promise<Response> => {
        const id = Number(req.params.taskId);
        const deleteTask = await this.service.delete(id);
        return res.status(204).json(deleteTask);
    };
}
export const taskController = new TaskController();