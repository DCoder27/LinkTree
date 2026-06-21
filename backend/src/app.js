import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import linkRoutes from "./routes/link.route.js";

import profileRoutes from "./routes/profile.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use(morgan("dev"));

// Authentication
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


// Only for Owner
app.use("/api/links", linkRoutes);


// Public
app.use("/api/profile", profileRoutes);

export default app;
