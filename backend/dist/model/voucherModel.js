"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voucherModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const voucherSchema = new Schema({
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
});
exports.voucherModel = mongoose_1.default.model('Voucher', voucherSchema);
