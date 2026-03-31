import express from "express";

import authRoutes from "./authRoutes.js";
import agentRoutes from "./agentRoutes.js";
import adRoutes from "./adRoutes.js";
import feedRoutes from "./feedRoutes.js";
import adTrackingRoutes from "./adTrackingRoutes.js";
import userRoutes from "./userRoutes.js";
import articleRoutes from "./articleRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/admin/agents", agentRoutes);

router.use("/admin/ads", adRoutes);

router.use("/feed", feedRoutes);

router.use("/ads", adTrackingRoutes);

router.use("/user", userRoutes);

router.use("/articles", articleRoutes);

export default router;