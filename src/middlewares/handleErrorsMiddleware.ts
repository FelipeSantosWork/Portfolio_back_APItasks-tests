import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError";
import { JsonWebTokenError } from "jsonwebtoken";

class HandleErrorsMiddleware {
    public static execute = (error: Error, req: Request, res: Response, next: NextFunction): Response => {

        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({ message: "Token is required" })
        }
        if (error instanceof ZodError)

            if (error instanceof ZodError) {
                const hasInvalidTypeError = error.errors.some(err => err.code === 'invalid_type');

                const specificRoute = '/users/login';

                if (hasInvalidTypeError && req.path === specificRoute) {
                    return res.status(409).json({ errors: error.errors });
                }
                return res.status(400).json({ errors: error.errors });
            }
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const handleErrors = HandleErrorsMiddleware.execute;