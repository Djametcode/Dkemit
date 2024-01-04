import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';

interface IJWT {
    userId: string;
    username: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const headers = req.headers.authorization;

        if (!headers || !headers.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Please login first" })
        }

        const token = headers.split(" ")[1]

        const payload = jwt.verify(token, process.env.JWT_SECRET) as IJWT
        console.log(payload)
        console.log(typeof (payload))

        req.user = { userId: payload.userId, username: payload.username }
        next()
    } catch (error) {
        console.log(error)
    }
}