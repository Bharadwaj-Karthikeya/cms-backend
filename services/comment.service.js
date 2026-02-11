import comment from "../models/comment.js";

export const createCommentService = async ({ artifactId, userId, content }) => {
    if (!artifactId || !userId || !content) {
        throw new Error("Artifact ID, User ID, and content are required to create a comment.")
    }

    const newComment = await comment.create({
        artifact: artifactId,
        user: userId,
        content
    })
    return newComment
}

export const getCommentsByArtifactService = async (artifactId) => {
    if (!artifactId) {
        throw new Error("Artifact ID is required to fetch comments.");
    }

    const comments = await comment.find({ artifact: artifactId }).sort({ createdAt: -1 });
    return comments;
}

export const deleteCommentService = async ({ commentId, userId }) => {
    if (!commentId || !userId) {
        throw new Error("Comment ID and User ID are required to delete a comment.")
    }

    const deletedComment = await comment.findOneAndDelete({
        _id: commentId,
        user: userId
    })

    if (!deletedComment) {
        throw new Error("Comment not found or you do not have permission to delete this comment.")
    }

    return deletedComment
}

