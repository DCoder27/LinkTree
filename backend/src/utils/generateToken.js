import jwt from "jsonwebtoken";

// Generate a JWT token for authenticated users.
// The token payload contains the user id only.
const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
};

export default generateToken; // Export helper for creating JWT tokens.
