// Routes for authenticated link management.
// Only signed-in users can create, read, update, delete, and view analytics for their links.
import express from "express";

import protect from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import { createLinkValidator } from "../validators/link.validator.js";
import {
  createLinkController,
  deleteLinkController,
  getMyLinksController,
  updateLinkController,
} from "../controllers/link.controller.js";
import { getAnalyticsController } from "../controllers/profile.controller.js";

const router = express.Router();

// Create a new link for the authenticated user.
router.post("/", protect, createLinkValidator, validate, createLinkController);

// Get all links belonging to the authenticated user.
router.get("/", protect, getMyLinksController);

// Update a specific link by id, only if the user owns it.
router.put("/:id", protect, updateLinkController);

// Delete a specific link by id, only if the user owns it.
router.delete("/:id", protect, deleteLinkController);

// View link analytics for the authenticated user.
router.get("/analytics", protect, getAnalyticsController);

export default router;
