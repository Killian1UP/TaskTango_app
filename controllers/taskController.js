const mongoose = require('mongoose')
const Task = require("../schemas/taskSchema")

const createTask = async (req, res) => {
    const { title, description, category, deadline, priority } = req.body

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        })
    }
    if (deadline && new Date(deadline) < new Date()) {
        return res.status(400).json({
            message: "Deadline cannot be in the past"
        })
}
    try {
        const newTask = new Task({
            title, 
            description, 
            category, 
            deadline, 
            priority,
            user: req.user._id
        })

        await newTask.save()

        res.status(201).json({
            message: "Task created successfully",
            task: newTask
        })

    } catch (error) {
        console.error(error.message)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const getTasks = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skip = (page - 1) * limit

        const tasks = await Task.find({ user: req.user._id })
            .populate('user', 'username email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalTasks = await Task.countDocuments({
            user: req.user._id
        })
        
        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(totalTasks / limit),
            totalTasks,
            tasks
        })
    
    } catch (error) {
        console.error(error.message)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid task ID"
            })
        }       // validate if the post id is there or not

        const task = await Task.findOne({
            _id: id,
            user: req.user._id
        }).populate('user', 'username email')
        
        if (!task) {
            return res.status(404).json({
                message: `Task with the id ${id} is not found`
            })
        }
        
        res.status(200).json(task)
    
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: "Internal server error"})
    }
}

const updateTask = async (req, res) => {
    try {

        const { id } = req.params
        const { title, description, category, deadline, priority, isCompleted } = req.body

        const task = await Task.findById(id)

        if (!task) {
            return res.status(404).json({
                message: `Task with the id ${id} is not found`
            })
        }

        if (!task.user.equals(req.user._id)) {
            return res.status(403).json({
                message: "You can only update your own tasks"
            })
        }

        // allowed updates only
        if (title) task.title = title
        if (description) task.description = description
        if (category) task.category = category
        if (deadline) task.deadline = deadline
        if (priority) task.priority = priority
        if (typeof isCompleted === "boolean") task.isCompleted = isCompleted // used typeof because false would otherwise be ignored.
        

        await task.save()

        res.status(200).json({
            message: "Task updated successfully.",
            task
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const deleteTask = async (req, res) => {

    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid task ID"
            })
        }

        const task = await Task.findById(id)
        
        if (!task) {
            return res.status(404).json({
                message: `Task with the id ${id} is not found`
            })
        }
        if (!task.user.equals(req.user._id)) {
            return res.status(403).json({
                message: "You can only delete your tasks"
            })
        }
        
        await task.deleteOne()
        
        res.status(200).json({
            message: "Task deleted successfully."
        })
    
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: "Internal server error"})
    }
}


module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
}