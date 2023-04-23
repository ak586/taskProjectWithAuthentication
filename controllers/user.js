import { User } from "../model/user.js";
import bcrypt from 'bcrypt'
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";




export const register = async (req, res,next) =>
{
    try {
        const { name, email, password } = req.body;
    let user = await User.findOne({ email });


    if (user) return next(new ErrorHandler("User already exists",404))

    const hashedPassword = await bcrypt.hash(password, 10)
    
    user = await User.create({ name, email, password: hashedPassword })
    //generate a cookie
    sendCookie(user, res, "Registered Successfully", 201);
    } catch (error) {
        next(error);
    }

};



export const getMyProile = async (req, res,next) =>
{
   
    try {
        const user = req.user;
    return res.status(200).json({
        success: true,
        message: 'user found',
        user
    });
    } catch (error) {
        next(error)
    }
};

export const login = async (req, res,next) =>
{

   try {
    const { email, password } = req.body;
    //check user existence
    const user = await User.findOne({ email }).select("+password");
    //user not registerd
    if (!user) return next(new ErrorHandler("User doesn't exist ",404));
   
    //compare password matches or not
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    //password not matched
    if (!isMatch)
        return res.status(404).json({
            success: false,
            message: "invalid password"
        });
    //generate a cookie after the user is logged in
    sendCookie(user, res, `Welcome back ${user.name}`, 200);
   } catch (error) {
    next(error)
   }
        
};

export const logout = (req, res,next) => {
   try {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite:process.env.NODE_ENV==='Development'?'lax':'none',
        secure: process.env.NODE_ENV==='Development'?false:true
    }).json({
        success: true,
        user:req.user
    })
   } catch (error) {
       next(error);
   }
}


