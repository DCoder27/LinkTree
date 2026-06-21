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

router.post("/register", registerValidator, validate, registerController);
router.post("/login", loginValidator, validate, loginController);

export default router;
