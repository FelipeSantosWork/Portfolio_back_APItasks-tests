import { prisma } from "../database/prisma";
import { TaskCreateReq, TaskCreateRes, TaskUpdateReq, TaskList } from "../interfaces";
import { taskCreateRes, taskUpdateSchemaRes, taskListSchema } from "../schemas";

export class TaskService {
    private task = prisma.task;

    public create = async (payload: TaskCreateReq): Promise<TaskCreateRes> => {
        const newTask = await this.task.create({ data: payload });
        return taskCreateRes.parse(newTask);
    };
    public list = async (categoryName?: string, userId?: number): Promise<Array<TaskList>> => {
        const tasks = await this.task.findMany({
            include: { category: true },
            where: {
                userId: userId,
                category: {
                    name: categoryName
                }
            }
        });
        return taskListSchema.array().parse(tasks);

    }

    public listById = async (id: number): Promise<TaskList> => {
        const task = await this.task.findFirst({
            where: { id: id },
            include: {
                category: true
            }
        });
        return taskListSchema.parse(task);
    };

    public update = async (id: number, payload: Partial<TaskUpdateReq>): Promise<any> => {
        const updateTask = await this.task.update({ where: { id: id }, data: payload });
        return taskUpdateSchemaRes.parse(updateTask);
    };
    public delete = async (id: number): Promise<void> => {
        await this.task.delete({ where: { id: id } });
    };
};
