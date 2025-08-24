import express from "express";
import { dbConnection } from "./db/dbConnection.js";
import { errorHandler } from "./src/modules/user/middleware/errorHandler.js";
import userRoutes from "./src/modules/user/user.routes.js";
import productRoutes from "./src/modules/product/product.routes.js";
import cartRoutes from "./src/modules/cart/cart.routes.js";
import orderRoutes from "./src/modules/order/order.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(errorHandler);

// routes
app.use("/api/user", userRoutes);       // ✅ هنا التعديل
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);

// connect db
dbConnection();

// run server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
