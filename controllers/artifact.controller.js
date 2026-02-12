import { 
    createArtifactService, 
    getAllArtifactsbyUserService, 
    getAllArtifactsService,
    deleteArtifactService,
    updateArtifactStatusService,
    getArtifactByStatusService,
    updateArtifacttoPublishedService
} from "../services/artifact.service.js";


export const createArtifact = async (req, res) => {
    console.log(req.user) 
    try {
        const artifact = await createArtifactService({
            ...req.body,
            userId: req.user.id,
            filePath: req.file?.path 
        });
        res.status(201).json({
            success: true,
            message: "Artifact created successfully",
            artifact
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: error.message 
        });
    }
}

export const getArtifactsbyUser = async (req, res) => {
    try {
        const artifacts = await getAllArtifactsbyUserService(req.user.id);
        res.status(200).json({
            success: true,
            message: "Artifacts fetched successfully",
            artifacts
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
} 

export const getArtifacts = async (req, res) => {
    try {
        const artifacts = await getAllArtifactsService();
        res.status(200).json({
            success: true,
            message: "Artifacts fetched successfully",
            artifacts
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteArtifact = async (req, res) => {
    try {
        const { artifactId } = req.body;
        const userId = req.user.id;
        const result = await deleteArtifactService({ artifactId, userId });
        res.status(200).json({
            success: true,
            message: "Artifact deleted successfully",
            result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}


export const getArtifactByStatus = async (req, res) => {
    try {
        console.log("Fetching artifact by status for user:", req.user.id);
        const { status } = req.body;
        const artifact = await getArtifactByStatusService(req.user.id, status);
        res.status(200).json({
            success: true,
            message: "Artifact fetched successfully",
            artifact
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const updateArtifactStatus = async (req, res) => {
    try {
        const { artifactId, status } = req.body;
        const userId = req.user.id;

        const artifact = await updateArtifactStatusService(artifactId, userId, status );
        res.status(200).json({
            success: true,
            message: "Artifact status updated successfully",
            artifact
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const updateArtifacttoPublished = async (req, res) => {
    try {
        const { artifactId } = req.body;
        const userId = req.user.id;
        const artifact = await updateArtifacttoPublishedService({ artifactId, userId });
        res.status(200).json({
            success: true,
            message: "Artifact status updated to published successfully",
            artifact
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}