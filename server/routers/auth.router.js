import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signUp", signUp);

router.post("/signIn", signIn);

router.post("/signOut");

export default router;
