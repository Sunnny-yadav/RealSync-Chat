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

const PORT = process.env.PORT;

app.use(cors(corsOption));



app.listen(PORT, () => {
  console.log("Server is intilized on port :: ", PORT);
});
