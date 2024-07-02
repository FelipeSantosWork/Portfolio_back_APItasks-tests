import { Router } from "express";
import { userController } from "../controllers";
import { userCreateSchemaReq } from "../schemas";
import { ensure, auth, ensureUserEmail } from "../middlewares";


export const userRouter = Router();

userRouter.post("", [ensure.bodyIsValid(userCreateSchemaReq), ensureUserEmail.emailExists], userController.create);

userRouter.get("", auth.isAuthenticated, userController.list);

// userRouter.get("/profile/:userId", auth.isAuthenticated,
//     auth.isResourceOwner,
//     userController.retrieve);

userRouter.get("/profile", auth.isAuthenticated, userController.retrieve)