import express from "express";
import cors from "cors";
import Gemini from "gemini-ai";

const app = express();

app.use(cors());
app.use(express.json());
const gemini = new Gemini("AIzaSyAST8o1ocx9KIuUQRM2e8rQSwuJ6dZaj4c");

app.post("/api/send-message", async (req, res) => {
  const data = req.body;
  const response = await gemini.ask(data.message);
  console.log(data, response);
  res.send(response);
});

app.listen(4000, () => {
  console.log("Server is running on port 3000");
});
