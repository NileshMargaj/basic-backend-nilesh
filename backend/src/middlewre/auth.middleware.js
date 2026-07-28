import jwt from "jsonwebtoken"
import { User } from "../model/user.model.js"

export const isUserAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id).select("-password")
        req.user = user
        next()
    } catch (error) {
        return res
            .status(401)
            .json({
                success: false,
                message: "Unauthorized: Invalid token"
            })
    }
}