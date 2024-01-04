import mongoose from "mongoose";
import { User } from "../libs/types";
const { Schema } = mongoose

const userSchema = new Schema<User>({
    username: {
        type: String,
        required: [true, 'Please provide username']
    },
    email: {
        type: String,
        required: [true, 'Please provide email']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    product: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    }],
    avatar: {
        type: String,
        default: ""
    },
    cart: [{
        cartId: {
            type: Schema.Types.ObjectId,
            ref: 'Cart'
        }
    }],
    balance: {
        type: Number,
        default: 0
    }
})

export const userModel = mongoose.model("User", userSchema)