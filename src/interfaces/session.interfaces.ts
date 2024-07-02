import { z } from "zod";
import { sessionCreateSchemaRes, sessionCreateSchemaReq, sessionSchema, sessionReturnSchema } from "../schemas";

type Session = z.infer<typeof sessionSchema>;
type SessionCreateReq = z.infer<typeof sessionCreateSchemaReq>;
type SessionCreateRes = z.infer<typeof sessionCreateSchemaRes>;
type SessionReturn = z.infer<typeof sessionReturnSchema>;

export { Session, SessionCreateReq, SessionCreateRes, SessionReturn };