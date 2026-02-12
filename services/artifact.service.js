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
            console.error("Validation Error: Title and Content are required");
            throw new Error("Title and Content are required");
        }

        let mediaUrl = null;

        if (filePath) {
            console.log("Uploading media to Cloudinary:", filePath);
            const uploadResult = await cloudinary.uploader.upload(
                filePath,
                {
                    folder: "cms_artifacts"
                }
            );

            mediaUrl = uploadResult.secure_url;

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log("Local file deleted");
            }

            console.log("Media uploaded");
        }

        const artifact = await Artifact.create({
            title,
            content,
            author: userId,
            media: mediaUrl
        });

        console.log("Artifact created");

        return artifact;

    } catch (error) {

        console.error("Create Artifact Error:", error.message);
        throw error;

    }
};


export const getAllArtifactsbyUserService = async (userId) => {
    if (!userId) {
        console.error("Validation Error: User ID is required to fetch artifacts");
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
        console.error("Validation Error: Artifact ID and User ID are required to delete an artifact");
        throw new Error('Artifact ID and User ID are required to delete an artifact.');
    }

    const deletedArtifact = await Artifact.findOneAndDelete({
        _id: artifactId
    });

    if (!deletedArtifact) {
        throw new Error('Artifact not found or you do not have permission to delete this artifact.');
    }

    return deletedArtifact;
}

export const getArtifactByStatusService = async (userId, cstatus) => {
    if (!userId || !cstatus) {
        console.error("Validation Error: User ID and status are required to fetch artifact status");
        throw new Error('User ID and status are required to fetch artifact status.');
    }

    const artifact = await Artifact.findOne({
        status: cstatus
    });

    if (!artifact) {
        throw new Error('Artifact not found or you do not have permission to view this artifact.');
    }

    return artifact;
}

export const updateArtifactStatusService = async (artifactId, userId, newStatus) => {
    if (!artifactId || !userId || !newStatus) {
        console.error("Validation Error: Artifact ID, User ID, and new status are required to update artifact status");
        throw new Error('Artifact ID, User ID, and new status are required to update artifact status.');
    }

    const updatedArtifact = await Artifact.findOneAndUpdate(
        { status: newStatus },
        { new: true }
    );

    if (!updatedArtifact) {
        throw new Error('Artifact not found or you do not have permission to update this artifact.');
    }

    return updatedArtifact;
}

export const updateArtifacttoPublishedService = async ({ artifactId, userId}) => {
    if (!artifactId || !userId) {
        console.error("Validation Error: Artifact ID and User ID are required to update artifact status to published");
        throw new Error('Artifact ID and User ID are required to update artifact status to published.');
    }

    const updatedArtifact = await Artifact.findOneAndUpdate(
        { _id: artifactId },
        { status: "published" },
        { new: true }
    );

    if (!updatedArtifact) {
        throw new Error('Artifact not found or you do not have permission to update this artifact.');
    }

    return updatedArtifact;
}