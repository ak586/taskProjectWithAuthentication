import { User } from "../model/user.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find({});

    res.json({
        success: true,
        users,
    })
};


export const createNewUser =  async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
 await User.create({
        name,
        email,
        password,
 });
    //status code 201 means created
    res.status(201).json({
        success: true,
        message: "Registered successfully",
    });
}

export const specialUser = (req, res) => {
    res.json({
        success: true,
        message: "bhutiya banaya",
    })
};

export const getUserDetails=async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({
        success: true,
        user,
    })
}

export const updateUser=async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({
        success: true,
       message:"Details updated",
    })
}

export const deleteUser=async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    await user.remove();
    res.json({
        success: true,
       message:"User Deleted",
    })
}



