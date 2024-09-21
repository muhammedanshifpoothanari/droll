import { userController } from "../controllers/index.js";

import express, { Router } from "express";
import buildUserRoutes from "./user.routes.js";

const router = express.Router();

export const userRoutes = buildUserRoutes({
    router,
    userController,
});


