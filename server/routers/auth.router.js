import express from "express";
import { signUp } from "../controllers/auth.controller.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.post("/signUp", upload.any(), signUp);

router.post("/signIn");

router.post("/signOut");

export default router;
