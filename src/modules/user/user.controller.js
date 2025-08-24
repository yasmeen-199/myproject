import { userModel } from "../../../db/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ================== Register ==================
export const register = async (req, res) => {
    try {
        const { username, email, password, age } = req.body;

        // check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // check if this email is the OWNER email (from .env)
        const isOwner = email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            age,
            role: isOwner ? "admin" : "user"
        });

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ================== Login ==================
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || "flowershopSecret",
            { expiresIn: "1d" }
        );

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ================== Get Profile ==================
export const getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
// ================== Delete User (Admin only) ==================
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
// ================== Get All Users (Admin only) ==================
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password");
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
// ================== Get User By ID (Admin only) ==================
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
