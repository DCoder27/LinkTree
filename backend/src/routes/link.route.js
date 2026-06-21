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

router.post("/", protect, createLinkValidator, validate, createLinkController);

router.get("/", protect, getMyLinksController);

router.put("/:id", protect, updateLinkController);

router.delete("/:id", protect, deleteLinkController);

router.get("/analytics", protect, getAnalyticsController);

export default router;
