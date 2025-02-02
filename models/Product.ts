import { Schema, model, models } from "mongoose";

const imageVariantScema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["SQUARE", "WIDE", "PORTRAIT"]
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    license: {
        type: String,
        required: true,
        enum: ["personal", "commercial"]
    }
})

const productSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    variants: [imageVariantScema],
},
{timestamps: true})

const Product = models?.Product || model("product", productSchema);

export default Product;