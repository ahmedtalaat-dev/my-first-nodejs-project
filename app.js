require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  console.log("MongoDB connected successfully");
}

main().catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Course Schema
const courseSchema = new mongoose.Schema({
  title: String,
  price: Number,
});

// Course Model
const Course = mongoose.model("Course", courseSchema);

// =========================
// GET ALL COURSES - PAGINATION
// =========================
app.get("/api/courses", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const courses = await Course.find().skip(skip).limit(limit);

    const totalCourses = await Course.countDocuments();
    const totalPages = Math.ceil(totalCourses / limit);

    res.json({
      page: page,
      limit: limit,
      totalCourses: totalCourses,
      totalPages: totalPages,
      courses: courses,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to get courses",
      error: err.message,
    });
  }
});

// =========================
// GET ONE COURSE
// =========================
app.get("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json(course);
  } catch (err) {
    res.status(400).json({
      message: "Invalid course ID",
      error: err.message,
    });
  }
});

// =========================
// CREATE A COURSE
// =========================
app.post("/api/courses", async (req, res) => {
  try {
    const { title, price } = req.body;

    const course = new Course({
      title: title,
      price: price,
    });

    const savedCourse = await course.save();

    res.status(201).json(savedCourse);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create course",
      error: err.message,
    });
  }
});

// =========================
// UPDATE A COURSE
// =========================
app.put("/api/courses/:id", async (req, res) => {
  try {
    const { title, price } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        price: price,
      },
      {
        new: true,
      },
    );

    if (!updatedCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({
      message: "Failed to update course",
      error: err.message,
    });
  }
});

// =========================
// DELETE A COURSE
// =========================
app.delete("/api/courses/:id", async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json({
      message: "Course deleted successfully",
      course: deletedCourse,
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to delete course",
      error: err.message,
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
