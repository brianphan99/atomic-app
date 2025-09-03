// src/app.ts
import express, { Application, Request, Response } from "express";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware";
import userRoutes from "./routes/user.route";


export const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRoutes);

// Health check (optional, but useful for uptime monitors & Docker)
app.get("/", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "Workout API running" });
});

// Error handling middleware (last)
app.use(errorHandler);