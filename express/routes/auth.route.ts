import express from "express";
import { authenticateUser } from "../controller/controller"

const router = express.Router();

router.post("/googleLoginResult", authenticateUser); // (This is actually /auth POST route)

export default router;