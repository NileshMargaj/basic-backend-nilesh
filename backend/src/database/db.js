import { DB_NAME } from "../constant/constant.js"
import mongoose from "mongoose"
const MONGO_CONNECTION_URI = process.env.MONGO_CONNECTION_URI
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${MONGO_CONNECTION_URI}/${DB_NAME}`)
        console.log('Database connected successfully..')
    } catch (error) {
        throw new Error("Database connection error",error.message)
        process.exit(1)
    }
}