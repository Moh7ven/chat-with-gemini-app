import express from "express";
import {
  addMessage,
  createChat,
  getAllChatByUser,
  getMessages,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", createChat);
router.post("/message", addMessage);
router.get("/getAllChats", getAllChatByUser);
router.get("/getMessages", getMessages);

export default router;
