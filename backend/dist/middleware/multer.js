"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
function checkFileType(file, cb) {
    // Allowed file extensions
    const filetypes = /jpeg|jpg|png|gif/; // Add or remove file extensions as needed
    // Check the extension
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    // Check the mime type
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        cb(new Error('Error: Invalid type file'));
    }
}
const storage = multer_1.default.diskStorage({
    destination(req, file, callback) {
        callback(null, '/tmp');
    },
    filename(req, file, callback) {
        callback(null, file.originalname + '_' + Date.now());
    },
});
exports.upload = (0, multer_1.default)({
    storage: storage, limits: { fileSize: 1000000 }, fileFilter(req, file, callback) {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype) {
            return callback(null, true);
        }
        else {
            callback(new Error('Error: Invalid type file'));
        }
    },
});
