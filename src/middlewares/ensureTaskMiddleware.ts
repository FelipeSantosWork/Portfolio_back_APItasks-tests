import { NextFunction, Request, Response } from "express"
import { prisma } from "../database/prisma";

export class EnsureTaskMiddleware {
    public idExists = async (req: Request, res: Response, next: NextFunction) => {

        const foundTask = await prisma.task.findFirst({
            where: {
                id: Number(req.params.taskId),
            },
        });
        if (!foundTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        return next();
    };
    public categoryNameExists = async (req: Request, res: Response, next: NextFunction) => {
        const categoryName = String(req.query.category);
        if (!categoryName) return next();

        const foundTasks = await prisma.task.findFirst({
            where: { category: { name: categoryName } }
        });
        if (!foundTasks) {
            return res.status(404).json({ message: "Category not found" })
        }
        return next();

    }
}

export const ensureTask = new EnsureTaskMiddleware();