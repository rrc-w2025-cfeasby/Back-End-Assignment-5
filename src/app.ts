import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import { getHelmetConfig } from "../config/helmetConfig";
import healthRoutes from "./api/v1/routes/healthRoutes";
import eventRoutes from "./api/v1/routes/eventRoutes";

const app: Express = express();

app.use(getHelmetConfig());

app.use(express.json());
app.use("/api/v1", eventRoutes);
app.use("/api/v1", healthRoutes);

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

export default app;