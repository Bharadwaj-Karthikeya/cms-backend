import {
    toggleLikeService
} from "../services/like.service.js"

export const toggleLike = async (req, res) => {
    try{
        const result = await toggleLikeService({
            artifactId: req.params.artifactId,
            userId : req.user.id
        })

        res.status(200).json({
            success : true,
            message : result.liked ? "Liked" : "Unliked",
            artifactId : req.params.artifactId,
            userId: req.user.id
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}