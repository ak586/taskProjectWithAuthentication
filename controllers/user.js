import { User } from "../model/user.js";
import bcrypt from 'bcrypt'
import { sendCookie } from "../utils/features.js";


export const getAllUsers = async (req, res) => {

};


export const register = async (req, res) =>
{
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(404).json({
        success: false,
        message:"user already exists"
    })

    const hashedPassword = await bcrypt.hash(password, 10)
    
    user = await User.create({ name, email, password: hashedPassword })
    //generate a cookie
    sendCookie(user, res, "Registered Successfully", 201);

};



export const getMyProile = async (req, res) =>
{
   
    const user = req.user;
    return res.status(200).json({
        success: true,
        message: 'user found',
        user
    });
};

export const login = async (req, res) =>
{

    const { email, password } = req.body;
    //check user existence
    const user = await User.findOne({ email }).select("+password");
    //user not registerd
    console.log("inside login");
    if (!user) return res.status(404).json({
        success: false,
        message:"invalid email"
    })
   
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
        
};

export const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now())
    }).json({
        success: true,
        user:req.user
    })
}



