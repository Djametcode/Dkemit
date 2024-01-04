"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const productSchema = new Schema({
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
});
exports.productModel = mongoose_1.default.model('Product', productSchema);
