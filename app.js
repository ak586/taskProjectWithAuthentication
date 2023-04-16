import express from "express";
import UserRouter from './routes/user.js'
import { config } from 'dotenv'
config({
    path: "./data/config.env"
})


export const app = express();
//using a midddleware 
app.use(express.json());
app.use("/users",UserRouter);

//connect to the database

app.get('/', (req, res) => res.send("<h1>hey it's working</h1>"));
