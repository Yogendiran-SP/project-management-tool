const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = "mongodb://localhost:27017/myDatabase";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Stop the server if connection fails
  }
};

module.exports = connectDB;
