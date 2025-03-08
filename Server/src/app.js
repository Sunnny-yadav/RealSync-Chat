import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config({
  path: "./.env",
});

const corsOption = {
  origin: "http://localhost:5173",
};

app.use(express.json())
app.use(cors(corsOption));

// importing the routes 
import userRouter from './Router/user.router.js'

app.use("/api/v1/users",userRouter)


export default app;









