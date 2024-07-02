import express from "express";
import "express-async-errors";
import helmet from "helmet";
import { categoryRouter, taskRouter, userRouter, sessionRouter } from "./routers";
import { handleErrors } from "./middlewares";

export const app = express();

app.use(helmet());

app.use(express.json());


app.use('/categories', categoryRouter);
app.use('/tasks', taskRouter);
app.use('/users', userRouter);
app.use('/users/login', sessionRouter);

app.use(handleErrors);
