import { body } from "express-validator";

export const createLinkValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Title must be at least 6 characters long"),

  body("url")
    .notEmpty()
    .withMessage("URL is required")
    .bail()
    .isURL()
    .withMessage("Invalid URL"),
];
