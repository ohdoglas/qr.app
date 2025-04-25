import express, { Application } from "express";
import "dotenv/config";
import cors from "cors";
import routes from "./routes/router";

const app: Application = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());

app.use(routes);

export default app;
