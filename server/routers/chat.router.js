import express from "express";
import {
  addMessage,
  createChat,
  deleteChat,
  getAllChatByUser,
  getMessages,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", createChat);
router.post("/message", addMessage);
router.get("/getAllChats", getAllChatByUser);
router.get("/getMessages", getMessages);
router.delete("/:id", deleteChat);

export default router;
