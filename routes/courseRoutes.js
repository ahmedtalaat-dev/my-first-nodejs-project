const express = require("express");
const router = express.Router();

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

router.get("/", getCourses);
router.get("/:courseId", getCourse);
router.post("/", addCourse);
router.patch("/:courseId", updateCourse);
router.delete("/:courseId", deleteCourse);

module.exports = router;