const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const courses = [
  {
    id: 1,
    title: "HTML",
    price: 2500,
  },
  {
    id: 2,
    title: "CSS",
    price: 4500,
  },
];

// get all courses
app.get("/api/courses", (req, res) => {
  res.json(courses);
});

// get course
app.get("/api/courses/:courseId", (req, res) => {
  const id = req.params.courseId;
  const course = courses.find((c) => c.id == id);
  res.json(course);
});

// add course
app.post("/api/courses/", (req, res) => {
  const id = courses.length + 1;
  const course = {
    id: id,
    ...req.body,
  };
  courses.push(course);
  res.json(course);
});

// update courses
app.patch("/api/courses/:courseId", (req, res) => {
  const id = req.params.courseId;
  let course = courses.find((c) => c.id == id);
  course = {
    id,
    ...req.body,
  };

  res.json(course);
});

// delete course
app.delete("/api/courses/:courseId", (req, res) => {
  const id = req.params.courseId;
  const newCourses = courses.filter((c) => c.id != id);
  res.json(newCourses);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
