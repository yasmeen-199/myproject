import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ["Flower", "Chocolate"],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    image: String,
    quantity: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});

productSchema.pre("save", function (next) {
    if (this.name) {
        this.name = this.name.trim().toLowerCase();
    }
    next();
});

export const productModel = model("Product", productSchema);
