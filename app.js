import express from "express";
import UserRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import { config } from 'dotenv'
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
config({
    path: "./data/config.env"
})


export const app = express();
//using a midddleware 

app.use(express.json());//express.json route ke pehle use karna hai
app.use(cookieParser());


//using routes
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/task",taskRouter);

//using error middle ware
app.use(errorMiddleware);
//connect to the database
app.get('/', (req, res) => res.send("<h1>hey it's working</h1>"));
