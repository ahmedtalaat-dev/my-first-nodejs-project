require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// =========================
// CONNECT TO MONGODB
// =========================

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  console.log("MongoDB connected successfully");
}

main().catch((err) => {
  console.error("MongoDB connection error:", err);
});

// =========================
// USER SCHEMA
// =========================

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// =========================
// USER MODEL
// =========================

const User = mongoose.model("User", userSchema);

// =========================
// GET ALL USERS
// =========================

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Failed to get users",
      error: err.message,
    });
  }
});

// =========================
// START SERVER
// =========================

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});