const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// ✅ Create a new task
router.post("/", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json({ message: "Task created", task: newTask });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get all tasks for a project
router.get("/project/:projectId", async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update a task by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete a task by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted", task: deletedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
