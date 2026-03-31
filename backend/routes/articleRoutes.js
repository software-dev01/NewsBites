import express from "express";
import { getArticleById } from "../controllers/articleController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/:id", protect, getArticleById);


export default router;