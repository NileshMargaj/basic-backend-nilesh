import express from "express";
import dotenv from "dotenv";
dotenv.config()
import userRoute from "./route/user.route.js";
import cookieParser from "cookie-parser";


const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//! constum middlewares
app.use('/api/auth', userRoute)


export default app;