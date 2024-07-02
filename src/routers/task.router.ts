import { Router } from "express";
import { taskController } from "../controllers";
import { ensure, ensureTask, ensureCategory, auth } from "../middlewares";
import { taskUpdateSchemaReq, taskCreateReq } from "../schemas";

export const taskRouter = Router();

taskRouter.post("", auth.isAuthenticated, auth.autoLogin, ensure.bodyIsValid(taskCreateReq), ensureCategory.idExists, auth.userIdOnCreateTask, taskController.create);

taskRouter.get("", auth.isAuthenticated, auth.autoLogin, taskController.list);

taskRouter.get("/:taskId", auth.isAuthenticated, ensureTask.idExists, auth.isResourceOwnerTask, taskController.listById);

taskRouter.patch("/:taskId", auth.isAuthenticated, ensureTask.idExists, auth.isResourceOwnerTask, ensure.bodyIsValid(taskUpdateSchemaReq), taskController.update);

taskRouter.delete("/:taskId", auth.isAuthenticated, ensureTask.idExists, auth.isResourceOwnerTask, taskController.delete);