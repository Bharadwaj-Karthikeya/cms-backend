import express from 'express';
import {
    createArtifact,
    getArtifactsbyUser,
    getArtifacts,
    deleteArtifact,
    updateArtifactStatus,
    updateArtifacttoPublished,
    getArtifactByStatus
} from '../controllers/artifact.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import { upload } from '../middlewares/uploads.middleware.js';
import { apiRLimit } from '../middlewares/ratelimitter.middleware.js';

const artifactRouter = express.Router();

artifactRouter.post('/create', authMiddleware, upload.single("file"), createArtifact);
artifactRouter.get('/', apiRLimit ,authMiddleware, authorizeRoles("admin", "editor") , getArtifactsbyUser);
artifactRouter.get('/all', authMiddleware, getArtifacts);
artifactRouter.get('/status', authMiddleware, getArtifactByStatus);

artifactRouter.patch('/update-status', authMiddleware, authorizeRoles("admin", "editor"), updateArtifactStatus);
artifactRouter.patch('/publish', authMiddleware, authorizeRoles("admin", "editor"), updateArtifacttoPublished);

artifactRouter.delete('/delete', authMiddleware, authorizeRoles("admin", "editor") , deleteArtifact);
export default artifactRouter;