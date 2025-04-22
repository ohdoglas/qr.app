import express, { Application } from "express";
import "dotenv/config";
import cors from "cors";
import routes from "./routes/router";

const app: Application = express();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(routes);

export default app;
