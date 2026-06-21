import { validationResult } from "express-validator";

// Middleware that checks express-validator results and sends back
// a 400 response if validation errors are present.
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

export default validate;  // Export validation middleware.
