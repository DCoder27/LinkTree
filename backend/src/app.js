// Main Express application configuration.
// This file sets up global middleware and mounts the API route modules.
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import linkRoutes from "./routes/link.route.js";
import profileRoutes from "./routes/profile.route.js";

const app = express();

// Parse JSON request bodies and cookies.
app.use(express.json());
app.use(cookieParser());

// Enable cross-origin requests for client applications.
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Log incoming requests with HTTP details.
app.use(morgan("dev"));

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

// Authentication routes: register and login.
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Protected link management routes for authenticated users.
app.use("/api/links", linkRoutes);

// Public profile and click tracking routes.
app.use("/api/profile", profileRoutes);

export default app;
