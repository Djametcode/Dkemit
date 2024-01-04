import mongoose from "mongoose";
import { Voucher } from "../libs/types";
const { Schema } = mongoose

const voucherSchema = new Schema<Voucher>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    discount: {
        type: Number,
        required: [true, 'Please provide total discount']
    },
    voucherName: {
        type: String,
        required: [true, 'Please provide voucher name']
    }
})

export const voucherModel = mongoose.model('Voucher', voucherSchema)