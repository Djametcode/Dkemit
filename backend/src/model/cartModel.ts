import mongoose from "mongoose";
import { Cart } from "../libs/types";
const { Schema } = mongoose

const cartSchema = new Schema<Cart>({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    product: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    isCompleted: {
        type: Boolean,
        default: false
    },
    notes: {
        type: String,
        required: [true, "Please provide notes"]
    }
})

export const cartModel = mongoose.model('Cart', cartSchema)