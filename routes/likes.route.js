import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { toggleLike } from "../controllers/likes.controller.js"


const router = express.Router()
router.post('/:artifactId', authMiddleware, toggleLike)

export default router