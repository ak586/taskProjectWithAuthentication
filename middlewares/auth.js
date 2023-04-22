import { User } from "../model/user.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = async(req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(404).json({
        success: false,
        message:"Login First"
    })
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const MyId = decoded._id;
    const user = await User.findById(MyId);
    req.user = user;

    //next tabhi call hoga jab user logged in hoga
    next();
}