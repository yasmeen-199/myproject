import { userModel } from "../../../../db/models/user.model.js";

export const checkEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
