import express from "express";
import { bookSeat } from "../booking/booking.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router = express.Router();

router.put("/:id", authMiddleware, bookSeat);

export default router;