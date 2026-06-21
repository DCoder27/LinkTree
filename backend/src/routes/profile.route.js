import express from "express";
import {
  getPublicProfileController,
  trackLinkClickController,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/:username", getPublicProfileController);

router.get("/click/:linkId", trackLinkClickController);

export default router;
