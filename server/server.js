import express from "express";
import cors from "cors";
import Gemini from "gemini-ai";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const gemini = new Gemini(process.env.GEMINI_API_KEY);

app.post("/api/send-message", async (req, res) => {
  const data = req.body;
  const response = await gemini.ask(data.message);
  console.log(data, response);
  res.send(response);
});

app.listen(4000, () => {
  console.log("Server is running on port 3000");
});
