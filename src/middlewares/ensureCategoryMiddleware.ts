import { NextFunction, Request, Response } from "express"
import { prisma } from "../database/prisma";

export class EnsureCategoryMiddleware {
    public idExists = async (req: Request, res: Response, next: NextFunction) => {
        const categoryId = req.body?.categoryId ?? req.params?.categoryId;
        if (!categoryId) return next();

        const foundCategory = await prisma.category.findFirst({
            where: {
                id: Number(categoryId),
            },
        });
        if (!foundCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        return next();
    };
}

export const ensureCategory = new EnsureCategoryMiddleware();