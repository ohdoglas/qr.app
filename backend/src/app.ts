import express, { Application } from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import routes from "./routes/router";
import { isLocalQRCodeStorage } from "./utils/qrCodeStorage";

const app: Application = express();

app.get("/healthz", (_req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());

if (isLocalQRCodeStorage()) {
    app.use("/uploads/qrcodes", express.static(path.resolve(__dirname, "../uploads/qrcodes"), {
        dotfiles: "deny",
        index: false,
        fallthrough: false
    }));
}

app.use(routes);

export default app;
