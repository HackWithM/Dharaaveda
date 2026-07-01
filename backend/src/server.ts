import cors from "cors";
import type { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { connectDB } from "./config/db";
import routes from "./routes";
import { seedDatabase } from "./services/seed.service";

import path from "path";
import fs from "fs";

dotenv.config();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();
const port = Number(process.env.PORT || 3000);

const localDevelopmentOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174"
];

function parseOrigins(value?: string): string[] {
  return (value || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
}

const frontendOrigins = Array.from(
  new Set([
    ...parseOrigins(process.env.FRONTEND_URL),
    ...(process.env.NODE_ENV === "production" ? [] : localDevelopmentOrigins)
  ])
);

const corsOptions: CorsOptions = {
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
  origin(origin, callback) {
    if (!origin || frontendOrigins.includes("*") || frontendOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS.`));
  }
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "dharaaveda-backend" });
});

app.use("/api", routes);

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled API error:", error);
  res.status(500).json({ error: "Internal server error" });
});

async function startServer(): Promise<void> {
  await connectDB();
  await seedDatabase();

  app.listen(port, "0.0.0.0", () => {
    console.log(`DharaAveda API running on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start DharaAveda API:", error);
  process.exit(1);
});
