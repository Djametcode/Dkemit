"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProduct = exports.createProduct = void 0;
const userModel_1 = require("../model/userModel");
const productModel_1 = require("../model/productModel");
const cloudinary_1 = require("cloudinary");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, description, price, stock } = req.body;
    if (!productName || !price || !stock || !description) {
        return res.status(400).json({ msg: "Please fill requipment" });
    }
    const userId = req.user.userId;
    let file = req.file;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        if (!file) {
            return res.status(400).json({ msg: "Please attach file for product image" });
        }
        const fileUrl = yield cloudinary_1.v2.uploader.upload(file.path, {
            folder: 'Testing',
            resource_type: 'image'
        });
        const product = new productModel_1.productModel({
            productName: productName,
            description: description,
            price: price,
            stock: stock,
            images: fileUrl.secure_url
        });
        const newProduct = yield productModel_1.productModel.create(product);
        user.product.push({ productId: newProduct._id });
        yield user.save();
        return res.status(200).json({ msg: "success", newProduct });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ msg: "Internal server error" });
    }
});
exports.createProduct = createProduct;
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        const product = yield productModel_1.productModel.find({});
        return res.status(200).json({ msg: "success", product });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ msg: "Internal server error" });
    }
});
exports.getAllProduct = getAllProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        const product = yield productModel_1.productModel.findOne({ _id: id });
        if (!product) {
            return res.status(404).json({ msg: "product not found" });
        }
        return res.status(200).json({ msg: "success", product });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ msg: "Internal server error" });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { productName, description, price, stock } = req.body;
    if (!productName || !price || !stock || !description) {
        return res.status(400).json({ msg: "Please fill requipment" });
    }
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token Invalid" });
        }
        const targetProduct = yield productModel_1.productModel.findOne({ _id: id });
        if (!targetProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }
        const checkOwner = targetProduct.createdBy._id.toString() === user._id.toString();
        console.log(checkOwner);
        if (!checkOwner) {
            return res.status(401).json({ msg: "Please login with correct account" });
        }
        const updatedProduct = yield productModel_1.productModel.findOneAndUpdate({ _id: id }, {
            productName: productName,
            description: description,
            price: price,
            stock: stock,
        });
        return res.status(200).json({ msg: "success", updatedProduct });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ msg: "Internal server error" });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        const targetProduct = yield productModel_1.productModel.findOne({ _id: id });
        if (!targetProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }
        const checkOwner = targetProduct.createdBy._id.toString() === userId;
        console.log(checkOwner);
        if (!checkOwner) {
            return res.status(401).json({ msg: "Please login with correct account" });
        }
        const deletedProduct = yield productModel_1.productModel.findOneAndDelete({ _id: id });
        const index = user.product.findIndex((item) => item.productId.equals(id));
        user.product.splice(index, 1);
        yield user.save();
        return res.status(200).json({ msg: "success", deletedProduct });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ msg: "Internal server error" });
    }
});
exports.deleteProduct = deleteProduct;
