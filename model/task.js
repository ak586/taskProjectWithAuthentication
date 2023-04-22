import mongoose from 'mongoose'
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
   description: {
        type: String,
        required:true,
    },
    isCompleted: {
        type: Boolean,
        default:false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // collection ka jo name hoga reference mein vhi dena hai
        required:true,
    }
    ,
    createdAt: {
        type: Date,
        default:Date.now()
    }
})

export const Task = mongoose.model('Task', schema);
