import { Router } from "express";
import { categoryController } from "../controllers";
import { auth, ensure, ensureCategory } from "../middlewares";
import { categoryCreateSchema } from "../schemas";

export const categoryRouter = Router();

categoryRouter.post("", auth.isAuthenticated, auth.autoLogin, ensure.bodyIsValid(categoryCreateSchema), ensureCategory.idExists, auth.userIdOnCreateTask, categoryController.create);

categoryRouter.delete("/:categoryId", auth.isAuthenticated, ensureCategory.idExists, auth.isResourceOwnerCategory, categoryController.delete);