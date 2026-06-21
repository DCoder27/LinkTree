// Routes for user authentication.
// Handles registration and login requests.
import express from "express";

import protect from "../middlewares/auth.middleware.js";
import {
  loginController,
  registerController,
  getCurrentUser,
} from "../controllers/auth.controller.js";

import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";

import validate from "../middlewares/validation.middleware.js";

const router = express.Router();

router.get("/me", protect, getCurrentUser);

// Register a new user with validation checks.
router.post("/register", registerValidator, validate, registerController);

// Login an existing user and issue authentication cookie.
router.post("/login", loginValidator, validate, loginController);

export default router;
