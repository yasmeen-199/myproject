import { Router } from "express";
import {
    addToCart,
    getCart,
    removeFromCart,
    getAllCarts,
    deleteCart
} from "./cart.controller.js";
import { verifyToken } from "../user/middleware/verifyToken.js";
import { checkAdmin } from "../user/middleware/checkAdmin.js";

const router = Router();

// ====== USER ROUTES ======
router.post("/add", verifyToken, addToCart);        // Add product to own cart
router.get("/:userId", verifyToken, getCart);      // Get own cart
router.delete("/remove", verifyToken, removeFromCart); // Remove product from own cart

// ====== ADMIN ROUTES ======
router.get("/", verifyToken, checkAdmin, getAllCarts); // Get all carts
router.delete("/:userId", verifyToken, checkAdmin, deleteCart); // Delete cart of any user

export default router;
