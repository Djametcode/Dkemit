import 'dotenv/config'
import express from 'express'
import { connectDB } from './database/connectDB'
const app = express()
import cors from 'cors'
import { authRoute } from './routes/authRoute'
import { v2 as cloudinary } from 'cloudinary'
import { productRoute } from './routes/productRoute'


cloudinary.config({
    api_key: process.env.API_KEY,
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.API_SECRET
})

app.use(cors({
    origin: ["*"]
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v19/dkemit', authRoute)
app.use('/api/v19/dkemit/product/', productRoute)

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(3000, () => console.log("server running"))
    } catch (error) {
        console.log(error)
    }
}

startServer()