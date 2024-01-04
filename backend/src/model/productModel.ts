import mongoose from "mongoose";
import { Product } from "../libs/types";
const { Schema } = mongoose

const productSchema = new Schema<Product>({
    productName: {
        type: String,
        required: [true, 'Please provide product name']
    },
    description: {
        type: String,
        required: [true, "Please provide product description"]
    },
    price: {
        type: Number,
        required: [true, 'Please provide price']
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    voucher: [{
        voucherId: {
            type: Schema.Types.ObjectId,
            ref: 'Voucher'
        }
    }],
    stock: {
        type: Number,
        default: 1
    },
    images: {
        type: String,
        default: ""
    }
})

export const productModel = mongoose.model('Product', productSchema)