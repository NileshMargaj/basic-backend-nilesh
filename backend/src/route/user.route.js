import express from "express";
import { registerUser, loginUser, logoutUser, forgotPassword, verifyOtp, resetPassword } from "../controller/user.controller.js";
import { isUserAuthenticated } from "../middlewre/auth.middleware.js";

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/profile', isUserAuthenticated, (req, res) => {
    res.json({
        success: true,
        message: "User profile route",
        user: req.user
    })
})

router.post('/forgot-password', forgotPassword)
router.post('/verify-otp', verifyOtp)
router.post('/reset-password', resetPassword)

export default router;