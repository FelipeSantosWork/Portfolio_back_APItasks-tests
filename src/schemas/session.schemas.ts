import { z } from "zod";

const sessionSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(255),
    email: z.string().max(255),
    password: z.string().max(255)
});

const sessionCreateSchemaReq = sessionSchema.omit({ id: true, name: true });
const sessionCreateSchemaRes = sessionSchema.omit({ password: true });


const sessionReturnSchema = z.object({
    accessToken: z.string(),
}).extend({ user: sessionCreateSchemaRes });

export { sessionCreateSchemaRes, sessionCreateSchemaReq, sessionSchema, sessionReturnSchema }