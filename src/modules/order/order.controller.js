import { orderModel } from "../../../db/models/order.model.js";
import { productModel } from "../../../db/models/product.model.js";

// Create new order
export const createOrder = async (req, res) => {
    try {
        const { userId, products } = req.body;

        // calculate total price
        let totalPrice = 0;
        for (let item of products) {
            const product = await productModel.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            totalPrice += product.price * item.quantity;
        }

        const newOrder = new orderModel({
            userId,
            products,
            totalPrice
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};

// Get all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate("userId").populate("products.productId");
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id).populate("userId").populate("products.productId");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: "Error fetching order", error });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error });
    }
};

// Delete order
export const deleteOrder = async (req, res) => {
    try {
        const order = await orderModel.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order", error });
    }
};
