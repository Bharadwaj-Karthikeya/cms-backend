import { createCommentService, deleteCommentService } from "../services/comment.service.js";

export const createComment = async (req, res) => {
    console.log("user:", req.user);
    // console.log("Creating comment with data:", { artifactId: req.body.artifactId, content: req.body.content, userId: req.user.id });
    // const {artifact,id}
    try {
        const newComment = await createCommentService({
            artifactId: req.body.artifact,
            userId : req.user.id,
            content : req.body.content
        });

        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message 
        });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.body;
        const userId = req.user.id; // Assuming user ID is available in req.user

        const deletedComment = await deleteCommentService({
            commentId,
            userId
        });

        res.status(200).json(deletedComment);
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}