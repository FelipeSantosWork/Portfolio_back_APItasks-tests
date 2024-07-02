import { z } from "zod";
import { taskCreateReq, taskCreateRes, taskUpdateSchemaReq, taskUpdateSchemaRes, taskSchema, taskListSchema } from "../schemas";

type Task = z.infer<typeof taskSchema>;
type TaskCreateReq = z.infer<typeof taskCreateReq>;
type TaskCreateRes = z.infer<typeof taskCreateRes>;
type TaskList = z.infer<typeof taskListSchema>;
type TaskUpdateReq = z.infer<typeof taskUpdateSchemaReq>;
type TaskUpdateRes = z.infer<typeof taskUpdateSchemaRes>;

export { Task, TaskCreateReq, TaskCreateRes, TaskList, TaskUpdateReq, TaskUpdateRes };