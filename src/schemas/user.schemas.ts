import { z } from "zod";

const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(255),
    email: z.string().max(255),
    password: z.string().max(255)
})

const userCreateSchemaReq = userSchema.omit({ id: true });
const userCreateSchemaRes = userSchema.omit({ password: true });

export { userCreateSchemaRes, userCreateSchemaReq, userSchema }