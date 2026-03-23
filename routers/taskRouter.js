const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController')
const taskRouter = express.Router()

taskRouter
    .post("/tasks", authMiddleware, createTask)
    .get("/tasks", authMiddleware, getTasks)
    .get("/tasks/:id", authMiddleware, getTaskById)
    .put("/tasks/:id", authMiddleware, updateTask)
    .delete("/tasks/:id", authMiddleware, deleteTask)

module.exports = taskRouter