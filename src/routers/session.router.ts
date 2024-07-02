import { Router } from "express";
import { sessionController } from "../controllers";
import { sessionCreateSchemaReq } from "../schemas";
import { ensure } from "../middlewares";


export const sessionRouter = Router();

sessionRouter.post("", ensure.bodyIsValid(sessionCreateSchemaReq), sessionController.login);
