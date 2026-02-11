import Like from "../models/likes.js"

export const toggleLikeService = async ({artifactId, userId}) => {
    if(!artifactId || !userId) {
        throw new Error("Artifact ID and User ID are required to toggle like.")
    }

    const exists = await Like.findOne({
        artifact : artifactId,
        user : userId
    })

    if (exists) {
        await Like.deleteOne({_id: exists._id})
        return { liked: false }
    }
    await Like.create({
        artifact : artifactId,
        user : userId
    })
    return { liked: true }
}