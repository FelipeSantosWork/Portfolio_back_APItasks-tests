import { prisma } from "../database/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/AppError";
import { jwtConfig } from "../configs/auth.config";
import { sessionReturnSchema } from "../schemas";
import { SessionCreateReq, SessionReturn } from "../interfaces";

export class SessionService {
    private user = prisma.user;

    public login = async ({ email, password }: SessionCreateReq): Promise<SessionReturn> => {
        const foundUser = await this.user.findFirst({
            where: { email: email }
        });

        if (!foundUser) {
            throw new AppError("User not exists", 404);
        }
        const passwordMatch = await compare(password, foundUser.password);
        if (!passwordMatch) {
            throw new AppError("Email and password doesn't match", 401);
        }
        const { secret, expiresIn } = jwtConfig();

        const accessToken = sign({ id: foundUser.id }, secret, { expiresIn: expiresIn });


        return sessionReturnSchema.parse({ accessToken, user: foundUser });
    }

}