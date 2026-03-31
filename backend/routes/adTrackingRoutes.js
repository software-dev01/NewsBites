import express from "express";

import {
  trackAdView,
  trackAdClick
} from "../controllers/adTrackingController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/view/:adId", protect, trackAdView);

router.post("/click/:adId", protect, trackAdClick);

export default router;