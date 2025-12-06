import jwt from "jsonwebtoken";
import User from "../models/user.js";

var authMiddleware = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.jwt_secret_key );
            req.user = await User.findById(decoded.userId).select("-password");
            next(); 
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

export default authMiddleware; 