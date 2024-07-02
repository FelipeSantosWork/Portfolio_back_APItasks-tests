import { z } from "zod";

const categorySchema = z.object({
    id: z.number().positive(),
    name: z.string().max(255),
    userId: z.number().positive().nullish(),
})

const categoryCreateSchema = categorySchema.omit({ id: true, userId: true });

export { categoryCreateSchema, categorySchema }