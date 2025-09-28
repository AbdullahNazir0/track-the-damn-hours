import { Router } from "express";
import { createHeartbeat } from "../controllers/heartbeat.controllers.js";

const router = Router();

router.post("/", createHeartbeat);

export default router;