const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database/db"); // MongoDB Connection
const User = require("./models/User"); // User Model

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: "*", credentials: true }));

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data"); // Data routes
const projectRoutes = require("./routes/projectroutes"); // Project routes
const taskRoutes = require("./routes/taskRoutes"); // Task routes

app.use("/api/auth", authRoutes);
app.use("/api", dataRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ USER CRUD Operations
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted", user: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
