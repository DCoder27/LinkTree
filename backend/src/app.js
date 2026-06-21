import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import linkRoutes from "./routes/link.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/links", linkRoutes);

export default app;
