import { productModel } from "../../../db/models/product.model.js";

// ================== Create or Update Product ==================
export const createProduct = async (req, res) => {
    try {
        const { name, type, price, description, image, quantity } = req.body;
        if (!name || !type || !price) {
            return res.status(400).json({ message: "Name, type and price are required" });
        }

        const normalizedName = name.trim().toLowerCase();

        // البحث والتحديث أو إضافة جديد
        const product = await productModel.findOneAndUpdate(
            { name: normalizedName, type },   // ✅ شرط الاسم + النوع
            {
                $inc: { quantity: quantity || 0 },
                $set: { price, description, image }
            },
            { new: true, upsert: true, runValidators: true }
        );

        return res.status(200).json({
            message: "Product created/updated successfully",
            product
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// ================== Get Single Product ==================
export const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ================== Update Product ==================
export const updateProduct = async (req, res) => {
    try {
        if (req.body.name) {
            req.body.name = req.body.name.trim().toLowerCase();
        }

        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product updated", product });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ================== Delete Product ==================
export const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
