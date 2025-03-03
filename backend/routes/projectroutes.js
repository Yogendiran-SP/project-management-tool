const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// ✅ Create a new project
router.post("/", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({ message: "Project created", project: newProject });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update a project by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project updated", project: updatedProject });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete a project by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted", project: deletedProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
