import { z } from "zod";
import { categoryCreateSchema, categorySchema } from "../schemas";

type Category = z.infer<typeof categorySchema>;
type CategoryCreate = z.infer<typeof categoryCreateSchema>;

export { Category, CategoryCreate };