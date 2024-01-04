import multer, { FileFilterCallback } from 'multer'
import path from 'path';

function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
    // Allowed file extensions
    const filetypes = /jpeg|jpg|png|gif/; // Add or remove file extensions as needed

    // Check the extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // Check the mime type
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Invalid type file'))
    }
}

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, '/tmp')
    },
    filename(req, file, callback) {
        callback(null, file.originalname + '_' + Date.now())
    },
})

export const upload = multer({
    storage: storage, limits: { fileSize: 1000000 }, fileFilter(req, file, callback) {
        const filetypes = /jpeg|jpg|png|gif/

        const mimetype = filetypes.test(file.mimetype)

        if (mimetype) {
            return callback(null, true)
        } else {
            callback(new Error('Error: Invalid type file'))
        }
    },
})