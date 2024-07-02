import { NextFunction, Request, Response } from "express"
import { prisma } from "../database/prisma";

export class EnsureUserEmailMiddleware {
    public emailExists = async (req: Request, res: Response, next: NextFunction) => {
        const userEmail = req.body.email;
        const foundUser = await prisma.user.findFirst({
            where: {
                email: userEmail,
            },
        });
        if (foundUser) {
            return res.status(409).json({ message: "This email is already registered" });
        }
        return next();
    };
}

export const ensureUserEmail = new EnsureUserEmailMiddleware();