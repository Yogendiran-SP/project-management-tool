const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/User"); // Ensure you have a User model
const router = express.Router();

// Register Route
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({ name, email, password });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      console.log("✅ User registered:", user); // Log the user object

      // Check if JWT_SECRET is set
      if (!process.env.JWT_SECRET) {
        console.error("❌ ERROR: JWT_SECRET is not defined in .env file!");
        return res.status(500).json({ msg: "Server configuration error" });
      }

      // Generate JWT
      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        process.env.JWT_SECRET, // Store this in .env
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error("❌ Registration Error:", err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Login Route
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        console.error("❌ Login Error: User not found for email:", email);
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      console.log("✅ User found:", user); // Debugging

      // Check if user has a password before comparing
      if (!user.password) {
        console.error("❌ Login Error: Password is missing for user:", user.email);
        return res.status(500).json({ msg: "Server error: Password missing" });
      }

      console.log("🔑 Comparing password:", password, "with hash:", user.password);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.error("❌ Login Error: Password does not match for email:", email);
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      // Generate JWT
      const payload = { user: { id: user.id } };

      // Check if JWT_SECRET is set
      if (!process.env.JWT_SECRET) {
        console.error("❌ ERROR: JWT_SECRET is not defined in .env file!");
        return res.status(500).json({ msg: "Server configuration error" });
      }

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error("❌ Login Error:", err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
