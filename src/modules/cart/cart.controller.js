import { cartModel } from "../../../db/models/cart.model.js";
import { productModel } from "../../../db/models/product.model.js";

// ================== USER: Add product to own cart ==================
export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const product = await productModel.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await cartModel.findOne({ userId });

        if (!cart) {
            cart = new cartModel({ userId, products: [{ productId, quantity }] });
        } else {
            const itemIndex = cart.products.findIndex(
                item => item.productId.toString() === productId
            );
            if (itemIndex > -1) {
                cart.products[itemIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(201).json({ message: "Product added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ================== USER: Get own cart ==================
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await cartModel.findOne({ userId }).populate("products.productId");
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ================== USER: Remove product from own cart ==================
export const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const cart = await cartModel.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.products = cart.products.filter(item => item.productId.toString() !== productId);
        await cart.save();
        res.status(200).json({ message: "Product removed", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ================== ADMIN: Get all carts ==================
export const getAllCarts = async (req, res) => {
    try {
        const carts = await cartModel.find().populate("products.productId");
        res.status(200).json({ carts });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ================== ADMIN: Delete any user's cart ==================
export const deleteCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await cartModel.findOneAndDelete({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        res.status(200).json({ message: "Cart deleted", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
