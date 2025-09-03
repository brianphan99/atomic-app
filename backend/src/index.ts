// src/index.ts
import dotenv from "dotenv";
import { app } from "./app";
import prisma from "./prisma/client";

dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    // Connect to database
    await prisma.$connect();
    console.log("✅ Database connected");

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      console.log("SIGINT received. Shutting down...");
      await prisma.$disconnect();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.log("SIGTERM received. Shutting down...");
      await prisma.$disconnect();
      process.exit(0);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

start();