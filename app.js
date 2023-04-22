import express from "express";
import UserRouter from './routes/user.js'
import { config } from 'dotenv'
import cookieParser from "cookie-parser";
config({
    path: "./data/config.env"
})


export const app = express();
//using a midddleware 

app.use(express.json());//express.json route ke pehle use karna hai
app.use(cookieParser());


//using routes
app.use("/api/v1/users",UserRouter);

//connect to the database
app.get('/', (req, res) => res.send("<h1>hey it's working</h1>"));
