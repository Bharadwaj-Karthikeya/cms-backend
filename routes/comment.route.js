import express from "express";
import { createComment, deleteComment } from "../controllers/comment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware ,createComment);
router.delete("/delete", authMiddleware, deleteComment);
export default router;
