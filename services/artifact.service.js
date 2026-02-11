import Artifact from "../models/artifact.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const createArtifactService = async ({
    title,
    content,
    userId,
    filePath
}) => {

    try {

        if (!title || !content) {
            throw new Error("Title and Content are required");
        }

        let mediaUrl = null;

        // ✅ Upload to Cloudinary if file exists
        if (filePath) {

            const uploadResult = await cloudinary.uploader.upload(
                filePath,
                {
                    folder: "cms_artifacts"
                }
            );

            mediaUrl = uploadResult.secure_url;

            // ✅ Delete local file after upload
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            console.log("Media uploaded:", mediaUrl);
        }

        // ✅ Create artifact in DB
        const artifact = await Artifact.create({
            title,
            content,
            author: userId,
            media: mediaUrl
        });

        console.log("Artifact created:", artifact);

        return artifact;

    } catch (error) {

        console.error("Create Artifact Error:", error.message);
        throw error;

    }
};


export const getAllArtifactsbyUserService = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required to fetch artifacts.');
    }

    const artifacts = await Artifact.find({ author: userId }).sort({ createdAt: -1 });
    return artifacts;
}

export const getAllArtifactsService = async () => {
    const artifacts = await Artifact.find().sort({ createdAt: -1 });
    return artifacts;
}

export const deleteArtifactService = async ({ artifactId, userId }) => {
    if (!artifactId || !userId) {
        throw new Error('Artifact ID and User ID are required to delete an artifact.');
    }

    const deletedArtifact = await Artifact.findOneAndDelete({
        _id: artifactId,
        author: userId
    });

    if (!deletedArtifact) {
        throw new Error('Artifact not found or you do not have permission to delete this artifact.');
    }

    return deletedArtifact;
}