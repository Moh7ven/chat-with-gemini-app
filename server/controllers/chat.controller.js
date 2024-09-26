import prisma from "../lib/prisma-client.js";
import Gemini from "gemini-ai";
import dotenv from "dotenv";
dotenv.config();

export const createChat = async (req, res) => {
  try {
    console.log(res.locals.userId);
    const name = req.body.name;
    if (name) {
      if (typeof name === "string") {
        const chat = await prisma.chat.create({
          data: {
            name,
            userId: res.locals.userId,
          },
        });
        console.log(chat);
        res.status(200).json({ chat, status: true });
      } else {
        res.json({ message: "Name must be a string" });
      }
    } else {
      res.json({ message: "Name is required" });
    }
  } catch (error) {
    console.log(error.errors);
    res.json(502).send(error.message);
  }
};

export const addMessage = async (req, res) => {
  try {
    let chatId = req.query.chatId;
    let text = req.body.text;
    if (!text) {
      res.json({ message: "Text is required" });
    }
    if (chatId) {
      const chat = await prisma.chat.findFirst({
        where: {
          id: parseInt(chatId),
        },
      });
      if (chat) {
        const message = await prisma.message.create({
          data: {
            text: text,
            chatId: parseInt(chatId),
          },
        });
        if (message) {
          const gemini = new Gemini(process.env.GEMINI_API_KEY);
          const response = await gemini.ask(message.text);
          console.log(response);
          const geminiResponse = await prisma.message.create({
            data: {
              text: response,
              isIA: true,
              chatId: parseInt(chatId),
            },
          });
          res.json(geminiResponse.text);
        } else {
          res.status(502).json({ message: "Message not created" });
        }
      } else {
        res.status(400).json({ message: "Chat not found" });
      }
    } else {
      res.status(402).json({ message: "Query chatId is required" });
    }
  } catch (error) {
    console.log(error.errors);
    res.status(502).send(error.message);
  }
};
