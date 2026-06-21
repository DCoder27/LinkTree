// User routes for authenticated account access.
// Returns the current authenticated user's profile data.
import express from "express";

import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

export default router;
