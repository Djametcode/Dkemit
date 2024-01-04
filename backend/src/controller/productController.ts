import { Request, Response } from 'express'
import { userModel } from '../model/userModel';
import { productModel } from '../model/productModel';
import { v2 as cloudinary } from 'cloudinary'

export const createProduct = async (req: Request, res: Response) => {
    const { productName, description, price, stock } = req.body

    if (!productName || !price || !stock || !description) {
        return res.status(400).json({ msg: "Please fill requipment" })
    }

    const userId = req.user.userId;

    let file = req.file

    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "Token invalid" })
        }

        if (!file) {
            return res.status(400).json({ msg: "Please attach file for product image" })
        }

        const fileUrl = await cloudinary.uploader.upload(file.path, {
            folder: 'Testing',
            resource_type: 'image'
        })

        const product = new productModel({
            productName: productName,
            description: description,
            price: price,
            stock: stock,
            images: fileUrl.secure_url
        })

        const newProduct = await productModel.create(product);
        user.product.push({ productId: newProduct._id })
        await user.save()

        return res.status(200).json({ msg: "success", newProduct })
    } catch (error) {
        console.log(error)
        return res.status(501).json({ msg: "Internal server error" })
    }
}

export const getAllProduct = async (req: Request, res: Response) => {
    const userId = req.user.userId;

    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "Token invalid" })
        }

        const product = await productModel.find({})

        return res.status(200).json({ msg: "success", product })
    } catch (error) {
        console.log(error)
        return res.status(501).json({ msg: "Internal server error" })
    }
}

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = req.user.userId;

    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "Token invalid" })
        }


        const product = await productModel.findOne({ _id: id })

        if (!product) {
            return res.status(404).json({ msg: "product not found" })
        }

        return res.status(200).json({ msg: "success", product })
    } catch (error) {
        console.log(error)
        return res.status(501).json({ msg: "Internal server error" })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const { productName, description, price, stock } = req.body

    if (!productName || !price || !stock || !description) {
        return res.status(400).json({ msg: "Please fill requipment" })
    }

    const userId = req.user.userId

    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "Token Invalid" })
        }

        const targetProduct = await productModel.findOne({ _id: id })

        if (!targetProduct) {
            return res.status(404).json({ msg: "Product not found" })
        }

        const checkOwner = targetProduct.createdBy._id.toString() === user._id.toString()
        console.log(checkOwner)

        if (!checkOwner) {
            return res.status(401).json({ msg: "Please login with correct account" })
        }

        const updatedProduct = await productModel.findOneAndUpdate({ _id: id }, {
            productName: productName,
            description: description,
            price: price,
            stock: stock,
        })

        return res.status(200).json({ msg: "success", updatedProduct })
    } catch (error) {
        console.log(error)
        return res.status(501).json({ msg: "Internal server error" })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = req.user.userId

    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "Token invalid" })
        }

        const targetProduct = await productModel.findOne({ _id: id })

        if (!targetProduct) {
            return res.status(404).json({ msg: "Product not found" })
        }

        const checkOwner = targetProduct.createdBy._id.toString() === userId
        console.log(checkOwner)

        if (!checkOwner) {
            return res.status(401).json({ msg: "Please login with correct account" })
        }

        const deletedProduct = await productModel.findOneAndDelete({ _id: id })
        const index = user.product.findIndex((item) => item.productId.equals(id))

        user.product.splice(index, 1)
        await user.save()

        return res.status(200).json({ msg: "success", deletedProduct })
    } catch (error) {
        console.log(error)
        return res.status(501).json({ msg: "Internal server error" })
    }
}