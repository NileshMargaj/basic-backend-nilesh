import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utility/sendEmil.utils.js";
import { OTP } from "../model/otp.model.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashPassword
        });

        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        const resUser = await User.findById(user._id).select("-password")

        const message = `Welcome to our application, ${username}! Your account has been successfully created. You can now log in using your email and password. `
        await sendEmail(email, "User registration successful", message)

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: resUser
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "All feilds are required"
                })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not found"
                })
        }


        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Incorrect password,Password is not matched"
                })
        }

        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        const resUser = await User.findById(user._id).select("-password")

        return res.status(201).json({
            success: true,
            message: "User logged in successfully",
            user: resUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}


export const logoutUser = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0)
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        if (!email) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Email is required"
                })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not found from the given email"
                })
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const newOtp = await OTP.create({
            otp,
            email
        })
        await newOtp.save()
        console.log("otp", newOtp)
        const message = `Your OTP for password reset is ${otp}. It will expire in 10 minutes.`
        await sendEmail(email, "Reset Password", message)
        return res
            .status(200)
            .json({
                success: true,
                message: "OTP sent successfully",
                email:newOtp.email,
                otp:newOtp.otp
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
    }
}


export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body
    try {
        if (!email || !otp) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Email and OTP are required"
                })
        }
        const otpRecord = await OTP.findOne({ email, otp })
        if (!otpRecord || Date.now() > otpRecord.createdAt.getTime() + 60 * 60 * 1000) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid or expired OTP"
                })
        }
        return res
            .status(200)
            .json({
                success: true,
                message: "OTP verified successfully"
            })
    } catch (error) {
        res
            .status(500)
            .json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
    }
}


export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body
    try {
        if (!email || !otp || !newPassword) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Email, OTP, and new password are required"
                })
        }
        const otpRecord = await OTP.findOne({ email, otp })
        if (!otpRecord || Date.now() > otpRecord.createdAt.getTime() + 60 * 60 * 1000) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid or expired OTP"
                })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not found from the given email"
                })
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword
        await user.save()
        await OTP.deleteMany({ email })
        return res
            .status(200)
            .json({
                success: true,
                message: "Password reset successfully"
            })
    } catch (error) {
        return res 
            .status(500)
             .json({
                 success: false,
                 message: "Internal server error",
                 error: error.message
             });
    }
}