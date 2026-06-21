// Controller for user authentication actions.
// Handles user registration and login, including token creation and cookie storage.
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered.
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Create a new user document.
    const user = await User.create({
      username,
      email,
      password,
    });

    // Generate JWT and store it in a secure cookie.
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email for authentication.
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare submitted password against hashed password.
    const isMatch = user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT and set it as a secure cookie.
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export { registerController, loginController, getCurrentUser };
