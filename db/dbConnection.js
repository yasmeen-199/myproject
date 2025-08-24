import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/flowershop");
        console.log("Database connected successfully ✅");
    } catch (err) {
        console.error("Database connection error ❌", err);
    }
};
