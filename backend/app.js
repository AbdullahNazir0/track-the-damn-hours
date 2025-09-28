import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import heartbeatRoutes from "./routes/heartbeat.routes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // React/Next dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you want cookies or Authorization headers
}));
app.use(express.json());

app.use(authRoutes);
app.use(heartbeatRoutes);

export default app;