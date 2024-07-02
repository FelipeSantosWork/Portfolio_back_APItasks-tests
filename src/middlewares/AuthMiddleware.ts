import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { verify } from "jsonwebtoken";
import { prisma } from "../database/prisma";
import { jwtConfig } from "../configs/auth.config";
import { category } from "../tests/mocks/category.mocks";

class AuthMiddleware {
    public isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
        const { authorization } = req.headers;

        if (!authorization) {
            throw new AppError("Missing token", 401);
        }

        const [_prefix, token] = authorization.split(" ");

        const { secret } = jwtConfig();

        const jwtPayload = verify(token, secret);

        res.locals = {
            ...res.locals, decoded: jwtPayload,
        };

        return next();
    };
    public isResourceOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const { decoded } = res.locals;
        const { userId } = req.params;

        if (decoded.id !== Number(userId)) {
            throw new AppError("Unauthorized", 403)
        };
        const user = await prisma.user.findFirst({ where: { id: Number(decoded.id) } });
        res.locals = { ...res.locals, user };
        return next();
    };
    public isResourceOwnerTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const { decoded } = res.locals;
        const { taskId } = req.params;

        const task = await prisma.task.findFirst({ where: { id: Number(taskId) } });
        if (decoded.id !== Number(task?.userId)) {
            throw new AppError("Unauthorized", 403)
        };
        res.locals = { ...res.locals, task };
        return next();
    };
    public isResourceOwnerCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const { decoded } = res.locals;
        const { categoryId } = req.params;

        const category = await prisma.category.findFirst({ where: { id: Number(categoryId) } });
        if (decoded.id !== Number(category?.userId)) {
            throw new AppError("Unauthorized", 403)
        };
        res.locals = { ...res.locals, category };
        return next();
    };
    public autoLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const { id } = res.locals.decoded;

        const user = await prisma.user.findFirst({ where: { id: Number(id) } });
        res.locals = { ...res.locals, user };
        return next();
    };
    public userIdOnCreateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        req.body.userId = res.locals.user.id;
        return next();
    }

}

export const auth = new AuthMiddleware;