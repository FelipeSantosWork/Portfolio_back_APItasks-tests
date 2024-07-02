import { NextFunction, Request, Response } from "express"
import { prisma } from "../database/prisma";

export class EnsureSessionDataMiddleware {
    // public emailExists = async (req: Request, res: Response, next: NextFunction) => {
    //     const userEmail = req.body.email;
    //     const foundUser = await prisma.user.findFirst({
    //         where: {
    //             email: userEmail,
    //         },
    //     });
    //     if (!foundUser) {
    //         return res.status(404).json({ message: "User not exists" });
    //     }
    //     return next();
    // };
}

export const ensureSessionData = new EnsureSessionDataMiddleware();