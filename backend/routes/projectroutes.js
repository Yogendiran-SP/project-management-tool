const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// ✅ Create a new project
router.post("/", async (req, res) => {
  try {
    const { name, status } = req.body;
    const newProject = new Project({
      name: name || "Untitled Project",
      status: status || "Pending",
    });
    await newProject.save();
    res.status(201).json({ message: "Project created", project: newProject });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get all projects (Ensure `name` & `status` are sent)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(
      projects.map((p) => ({
        id: p._id,
        name: p.name || "Unnamed Project",
        status: p.status || "Pending",
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({
      id: project._id,
      name: project.name || "Unnamed Project",
      status: project.status || "Pending",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update a project by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, status } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name, status },
      { new: true }
    );
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
