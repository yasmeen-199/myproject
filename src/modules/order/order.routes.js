import { Router } from "express";
import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
} from "./order.controller.js";

const router = Router();

// Create order
router.post("/", createOrder);

// Get all orders
router.get("/", getOrders);

// Get single order by id
router.get("/:id", getOrderById);

// Update order status
router.put("/:id", updateOrderStatus);

// Delete order
router.delete("/:id", deleteOrder);

export default router;
