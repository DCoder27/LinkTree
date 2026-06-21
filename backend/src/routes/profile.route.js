// Public profile routes used by front-end profile pages and link tracking.
import express from "express";
import {
  getPublicProfileController,
  trackLinkClickController,
} from "../controllers/profile.controller.js";

const router = express.Router();

// Return a public profile and its links for the given username.
router.get("/:username", getPublicProfileController);

// Track a click on a public link and redirect to its target URL.
router.get("/click/:linkId", trackLinkClickController);

export default router;
