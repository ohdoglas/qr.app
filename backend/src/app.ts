import express, { Application } from "express";
import "dotenv/config";

const app: Application = express();

app.get("/healthz", (_req, res) => {
    res.status(200).json({ status: "ok" });
});

export default app;
