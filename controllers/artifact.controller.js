import { 
    createArtifactService, 
    getAllArtifactsbyUserService, 
    getAllArtifactsService,
    deleteArtifactService
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