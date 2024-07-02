import { z } from "zod";
import { userCreateSchemaRes, userCreateSchemaReq, userSchema } from "../schemas";

type User = z.infer<typeof userSchema>;
type UserCreateReq = z.infer<typeof userCreateSchemaReq>;
type UserCreateRes = z.infer<typeof userCreateSchemaRes>;

export { User, UserCreateRes, UserCreateReq };