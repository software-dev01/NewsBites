import express from "express";

import {
  updatePreferences,
  toggleSaveArticle,
  getSavedArticles,
  getPersonalizedFeed,
  getUserPreferences
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/preferences", protect, getUserPreferences);

router.put("/preferences", protect, updatePreferences);

router.post("/save/:articleId", protect, toggleSaveArticle);

router.get("/saved", protect, getSavedArticles);

router.get("/for-you", protect, getPersonalizedFeed);


export default router;