import express from "express";
import { createComment, deleteComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", createComment);
router.delete("/delete", deleteComment);
export default router;
