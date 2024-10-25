import express from "express";
import {
  addMessage,
  createChat,
  deleteChat,
  getAllChatByUser,
  getChats,
  getMessages,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", createChat);
router.post("/message", addMessage);
router.get("/getAllChats", getAllChatByUser);
router.get("/getMessages", getMessages);
router.delete("/:id", deleteChat);
router.get("/", getChats);

export default router;
