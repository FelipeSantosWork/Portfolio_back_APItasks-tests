import { prisma } from "../database/prisma";
import { UserCreateReq, UserCreateRes } from "../interfaces";
import { userCreateSchemaRes } from "../schemas";
import { hash } from "bcryptjs";

export class UserService {
    private user = prisma.user;

    public create = async (payload: UserCreateReq): Promise<UserCreateRes> => {
        payload.password = await hash(payload.password, 10);

        const newUser = await this.user.create({ data: payload });
        return userCreateSchemaRes.parse(newUser);
    };
    public list = async (): Promise<Array<UserCreateRes>> => {
        const users = await this.user.findMany();
        return userCreateSchemaRes.array().parse(users);
    }
    public retrieve = async (userId: number): Promise<UserCreateRes> => {
        const user = await this.user.findFirst({ where: { id: userId } });
        return userCreateSchemaRes.parse(user);
    }
}