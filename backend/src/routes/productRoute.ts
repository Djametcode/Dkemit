import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import { createProduct, deleteProduct, getAllProduct, getProductById, updateProduct } from '../controller/productController'
import { upload } from '../middleware/multer'
const route = express.Router()

route.post('/create-product', authMiddleware, upload.single('image'), createProduct);
route.get('/get-all-product', authMiddleware, getAllProduct);
route.get('/product/:id', authMiddleware, getProductById)
route.patch('/update-product/:id', authMiddleware, updateProduct)
route.delete('/delete-product/:id', authMiddleware, deleteProduct)

export const productRoute = route;