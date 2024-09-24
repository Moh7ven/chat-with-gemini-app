import express from "express";
import { addMessage, createChat } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", createChat);
router.post("/message", addMessage);

export default router;
