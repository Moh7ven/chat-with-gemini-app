import express from "express";
import cors from "cors";
import Gemini from "gemini-ai";
import dotenv from "dotenv";
import prisma from "./lib/prisma-client.js";
import authRouter from "./routers/auth.router.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const gemini = new Gemini(process.env.GEMINI_API_KEY);

app.post("/api/send-message", async (req, res) => {
  const data = req.body;
  const response = await gemini.ask(data.message);
  console.log(data, response);
  res.send(response);
});

app.use("/api/auth", authRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
