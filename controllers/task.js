import ErrorHandler from "../middlewares/error.js";
import { Task } from "../model/task.js";

export const newTask = async (req, res,next) => {
    const { title, description } = req.body;
    await Task.create({
        title,
        description,
        user: req.user
    });
    res.status(201).json({
        success: true,
        message: 'task added'
    });
}

export const getMyTask = async (req, res,next) => {
    const myId = req.user._id;
    const tasks = await Task.find({ user: myId });
    res.status(200).json({
        success: true,
        tasks
    })

}

// updates the task completion status
export const updateTask = async (req, res,next) => {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("task not found",404));
    // reverse the completion status
    task.isCompleted = !task.isCompleted;
   
    await task.save();
    res.status(200).json({
        success: true,
        message: "Task updated"
    });
};

//delete task
export const deleteTask = async(req, res,next) => {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task not found",404));
    
    await task.deleteOne();
    res.status(200).json({
        success: true,
        message: "Task deleted"
    });
}