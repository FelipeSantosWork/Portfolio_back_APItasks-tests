import { prisma } from "../database/prisma";
import { Category, CategoryCreate } from "../interfaces";
import { categorySchema } from "../schemas";

export class CategoryService {
    private category = prisma.category;

    public create = async (payload: CategoryCreate): Promise<Category> => {
        const newCategory = await this.category.create({ data: payload });
        return categorySchema.parse(newCategory);
    };

    public delete = async (id: number): Promise<void> => {
        await prisma.category.delete({ where: { id: id } });
    };
}