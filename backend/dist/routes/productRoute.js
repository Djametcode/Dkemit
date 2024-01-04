"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const productController_1 = require("../controller/productController");
const multer_1 = require("../middleware/multer");
const route = express_1.default.Router();
route.post('/create-product', authMiddleware_1.authMiddleware, multer_1.upload.single('image'), productController_1.createProduct);
route.get('/get-all-product', authMiddleware_1.authMiddleware, productController_1.getAllProduct);
route.get('/product/:id', authMiddleware_1.authMiddleware, productController_1.getProductById);
route.patch('/update-product/:id', authMiddleware_1.authMiddleware, productController_1.updateProduct);
route.delete('/delete-product/:id', authMiddleware_1.authMiddleware, productController_1.deleteProduct);
exports.productRoute = route;
