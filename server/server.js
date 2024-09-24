import express from "express";
import cors from "cors";

import dotenv from "dotenv";
// import prisma from "./lib/prisma-client.js";
import authRouter from "./routers/auth.router.js";
import chatRouter from "./routers/chat.router.js";
import { checkUser } from "./middlewares/checkUser.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/chat", checkUser, chatRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
