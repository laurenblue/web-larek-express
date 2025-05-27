import express from "express";
import { createOrder } from "../controllers/orderController";
import { validateCreateOrder } from "../middlewares/validations";

const router = express.Router();

router.post("/order", validateCreateOrder, createOrder);

export default router;
