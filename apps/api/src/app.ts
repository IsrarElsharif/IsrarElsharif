import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:3000" }));
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/api/health", (_req, res) => {
    res.status(200).json({ ok: true, service: "masar-api" });
  });

  app.get("/api/v1", (_req, res) => {
    res.status(200).json({ message: "Masar API v1 is running" });
  });

  return app;
}
