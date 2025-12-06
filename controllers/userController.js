import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import transporter from "../config/emailConfig.js";

class UserController {
    // register user
    static registerUser = async (req, res) => {
        const { name, email, password, passwordConfirm, tc } = req.body;
        try {
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            } else {
                if (name && email && password && passwordConfirm && tc) {
                    if (password === passwordConfirm) {
                        try {
                            const salt = await bcrypt.genSalt(10);
                            const hashedPassword = await bcrypt.hash(password, salt);
                            const doc = new User({
                                name: name,
                                email: email,
                                password: hashedPassword,
                                tc: tc,
                            });
                            await doc.save();
                            res.status(201).json({ message: "User registered successfully" });
                        } catch (error) {
                            res.status(500).json({ message: "Registration failed", error: error.message });
                        }
                    } else {
                        return res.status(400).json({ message: "Passwords do not match" });
                    }
                } else {
                    return res.status(400).json({ message: "All fields are required" });
                }
            }
        } catch (error) {
            res.status(500).json({ message: "Registration failed", error: error.message });
        }
    };

    // login user
    static loginUser = async (req, res) => {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }

            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.jwt_secret_key ,
                { expiresIn: "1d" }
            );

            return res.status(200).json({
                message: "Login successful",
                token,
            });
        } catch (error) {
            return res.status(500).json({ message: "Login failed", error: error.message });
        }
    };

    //change password
    static changePassword = async (req, res) => {
        const { email, oldPassword, newPassword, confirmNewPassword } = req.body;
        try {
            if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Old password is incorrect" });
            }
            if (newPassword !== confirmNewPassword) {
                return res.status(400).json({ message: "New passwords do not match" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            await User.findByIdAndUpdate(user._id, { $set: { password: hashedPassword } });
            return res.status(200).json({ message: "Password changed successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Change password failed", error: error.message });
        }
    };

    //get logged in user details
    static getUserDetails = async (req, res) => {
        try {
            const userId = req.user._id;
            const user = await User.findById(userId).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ user });
        } catch (error) {
            return res.status(500).json({ message: "Failed to get user details", error: error.message });
        }
    };

    //send user password reset email
    static sendPasswordResetEmail = async (req, res) => {
        // Implementation for sending password reset email
        const { email } = req.body;
        try {
            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }
            const user = await User.findOne({ email: email });
            const secret = user._id + process.env.jwt_secret_key ;
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "15m" });
            const link = `http://localhost:8000/api/user/reset-password/${user._id}/${token}`;
            // console.log(link);
            //send email
            let info = await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: user.email,
                subject: "Password Reset Link",
                html: `<a href=${link}>Click Here</a> to reset your password. This link is valid for 15 minutes.`,
            });
            return res.status(200).json({ message: "Password reset email sent successfully", resetLink: link });     
        } catch (error) {
            return res.status(500).json({ message: "Failed to send password reset email", error: error.message });
        }
    };

    //link to reset password
    static resetPassword = async (req, res) => {
        const {password, confirmPassword} = req.body;
        const {id, token} = req.params;
        const user = await User.findById(id);
        const secret = user._id + process.env.jwt_secret_key ;
        try {
            const verify = jwt.verify(token, secret);
            if(password !== confirmPassword){
                return res.status(400).json({message: "Passwords do not match"});
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await User.findByIdAndUpdate(user._id, { $set: { password: hashedPassword } });
            return res.status(200).json({ message: "Password reset successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Password reset failed", error: error.message });
        }
    }
}


export default UserController;
