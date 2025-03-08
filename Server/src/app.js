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

app.use(cors(corsOption));



export default app;









