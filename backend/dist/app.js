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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const connectDB_1 = require("./database/connectDB");
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const authRoute_1 = require("./routes/authRoute");
const cloudinary_1 = require("cloudinary");
const productRoute_1 = require("./routes/productRoute");
cloudinary_1.v2.config({
    api_key: process.env.API_KEY,
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.API_SECRET
});
app.use((0, cors_1.default)({
    origin: ["*"]
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/v19/dkemit', authRoute_1.authRoute);
app.use('/api/v19/dkemit/product/', productRoute_1.productRoute);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connectDB_1.connectDB)(process.env.MONGO_URL);
        app.listen(3000, () => console.log("server running"));
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
