import express from "express";
import { register, login, getProfile, deleteUser, getAllUsers, getUserById } from "./user.controller.js";
import { verifyToken } from "./middleware/verifyToken.js";
import { checkAdmin } from "./middleware/checkAdmin.js";

const router = express.Router();

// register
router.post("/register", register);

// login
router.post("/login", login);

// get profile (protected route)
router.get("/profile", verifyToken, getProfile);

// get all users (Admin only)
router.get("/", verifyToken, checkAdmin, getAllUsers);

// get user by id (Admin only)
router.get("/:id", verifyToken, checkAdmin, getUserById);

// delete user (Admin only)
router.delete("/:id", verifyToken, checkAdmin, deleteUser);

export default router;
