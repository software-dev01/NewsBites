import express from "express";

import {
  createAd,
  getAds,
  updateAd,
  deleteAd,
  getAdAnalytics
} from "../controllers/adController.js";

import {
  protect,
  adminOnly
} from "../middleware/authMiddleware.js";


const router = express.Router();


router.post("/", protect, adminOnly, createAd);

router.get("/", protect, adminOnly, getAds);

router.put("/:id", protect, adminOnly, updateAd);

router.delete("/:id", protect, adminOnly, deleteAd);

router.get("/:adId/analytics", protect, adminOnly, getAdAnalytics);


export default router;