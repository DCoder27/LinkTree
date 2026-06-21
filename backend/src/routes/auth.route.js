// Routes for user authentication.
// Handles registration and login requests.
import express from "express";

import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";

import validate from "../middlewares/validation.middleware.js";

const router = express.Router();

// Register a new user with validation checks.
router.post("/register", registerValidator, validate, registerController);

// Login an existing user and issue authentication cookie.
router.post("/login", loginValidator, validate, loginController);

export default router;
