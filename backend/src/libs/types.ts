import { Types } from "mongoose";

export interface Voucher {
    voucherName: string;
    productId: Types.ObjectId;
    discount: number
}

export interface Product {
    productName: string;
    price: number;
    description: string;
    createdBy: Types.ObjectId;
    voucher: [{
        voucherId: Types.ObjectId
    }];
    stock: number;
    images: string
}

export interface Cart {
    createdBy: Types.ObjectId;
    product: [{
        productId: Types.ObjectId
        quantity: number;
    }]
    isCompleted: boolean;
    notes: string;
}

export interface User {
    username: string;
    avatar: string;
    email: string;
    password: string;
    product: [{
        productId: Types.ObjectId
    }]
    cart: [{
        cartId: Types.ObjectId
    }];
    balance: number;
}