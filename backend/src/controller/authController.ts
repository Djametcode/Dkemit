import { Request, Response } from "express";
import { userModel } from "../model/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ msg: "Please fill requipment" })
    }

    if (!password) {
        return res.status(400).json({ msg: "Please provide password" })
    }


    try {
        const checkUser = await userModel.findOne({ email: email })

        if (checkUser) {
            return res.status(400).json({ msg: "Email already register try another email" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        const user = new userModel({
            username: username,
            email: email,
            password: hashedPass
        })

        const newUser = await userModel.create(user);

        return res.status(200).json({ msg: "success", newUser })
    } catch (error) {
        console.log(error)
        return res.status(501).json({ msg: "Internal server error" })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(400).json({ msg: "Please provide email" })
    }

    try {
        const user = await userModel.findOne({ email: email })

        if (!user) {
            return res.status(404).json({ msg: "Email not registered yet" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch)

        const token = await jwt.sign({
            userId: user._id,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMES })

        return res.status(200).json({ msg: "success", user, token })

    } catch (error) {
        console.log(error)
        return res.status(501).json({ msg: "Internal server error" })
    }
}