import express from 'express';
import {
    createArtifact,
    getArtifactsbyUser,
    getArtifacts,
    deleteArtifact
} from '../controllers/artifact.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import { upload } from '../middlewares/uploads.middleware.js';

const artifactRouter = express.Router();

artifactRouter.post('/create', authMiddleware, upload.single("file"), createArtifact);
artifactRouter.get('/', authMiddleware, authorizeRoles("admin", "editor") , getArtifactsbyUser);
artifactRouter.get('/all', authMiddleware, getArtifacts);
artifactRouter.delete('/delete', authMiddleware, authorizeRoles("admin", "editor") , deleteArtifact);
export default artifactRouter;