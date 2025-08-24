import { Router } from "express";
import { verifyToken } from "../user/middleware/verifyToken.js";
import { checkAdmin } from "../user/middleware/checkAdmin.js";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "./product.controller.js";

const router = Router();

// أي مستخدم يقدر يشوف كل المنتجات
router.get("/", getProducts);

// عرض منتج محدد
router.get("/:id", getProductById);

// Admin فقط: إضافة منتج (أو تحديث الكمية لو موجود)
router.post("/", verifyToken, checkAdmin, createProduct);

// Admin فقط: تعديل منتج
router.put("/:id", verifyToken, checkAdmin, updateProduct);

// Admin فقط: حذف منتج
router.delete("/:id", verifyToken, checkAdmin, deleteProduct);

export default router;
