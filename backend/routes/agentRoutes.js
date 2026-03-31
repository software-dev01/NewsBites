import express from "express";

import {
  createAgent,
  getAgents,
  updateAgent,
  deleteAgent
} from "../controllers/agentController.js";

import {
  protect,
  adminOnly
} from "../middleware/authMiddleware.js";


const router = express.Router();


router.post("/", protect, adminOnly, createAgent);

router.get("/", protect, adminOnly, getAgents);

router.put("/:id", protect, adminOnly, updateAgent);

router.delete("/:id", protect, adminOnly, deleteAgent);


export default router;