import { Router } from "express";

import {
  getMyProfile,
  updateMyProfile,
  getUserById,
} from "../controllers/userController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

// Logged-in user profile
router.get("/profile", protect, getMyProfile);
router.get("/me", protect, getMyProfile);
router.get("/getme", protect, getMyProfile);

// Update logged-in user profile
router.put("/profile", protect, updateMyProfile);
router.put("/update", protect, updateMyProfile);
router.post("/update", protect, updateMyProfile);

// Public user profile
router.get("/:id", getUserById);

export default router;