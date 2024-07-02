import { z } from "zod";
import { categorySchema } from "./category.schemas";

const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string().max(255),
    content: z.string().max(255),
    finished: z.boolean().default(false),
    userId: z.number().positive().nullish(),
    categoryId: z.number().positive().nullish(),
})

const taskCreateReq = taskSchema.omit({ id: true, userId: true });
const taskCreateRes = taskSchema;
const taskListSchema = taskSchema.omit({ categoryId: true, userId: true }).extend({ category: categorySchema.nullish(), });
const taskUpdateSchemaReq = taskSchema.omit({ id: true, userId: true, categoryId: true });
const taskUpdateSchemaRes = taskSchema;

export { taskUpdateSchemaReq, taskUpdateSchemaRes, taskCreateReq, taskCreateRes, taskListSchema, taskSchema }

