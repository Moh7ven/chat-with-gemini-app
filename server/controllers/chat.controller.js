import prisma from "../lib/prisma-client.js";

export const createChat = async (req, res) => {
  try {
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
        res.json(chat);
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
            text: req.body.text,
            chatId: parseInt(chatId),
          },
        });
        if (message) {
          res.json(message);
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
