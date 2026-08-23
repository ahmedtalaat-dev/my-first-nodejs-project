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

const getCourses = (req, res) => {
  res.json(courses);
};

const getCourse = (req, res) => {
  const id = req.params.courseId;
  const course = courses.find((c) => c.id == id);

  res.json(course);
};

const addCourse = (req, res) => {
  const id = courses.length + 1;

  const course = {
    id,
    ...req.body,
  };

  courses.push(course);

  res.json(course);
};

const updateCourse = (req, res) => {
  const id = req.params.courseId;

  const course = courses.find((c) => c.id == id);

  if (!course) {
    return res.status(404).json({
      message: "Course not found",
    });
  }

  Object.assign(course, req.body);

  res.json(course);
};

const deleteCourse = (req, res) => {
  const id = req.params.courseId;

  const index = courses.findIndex((c) => c.id == id);

  if (index === -1) {
    return res.status(404).json({
      message: "Course not found",
    });
  }

  courses.splice(index, 1);

  res.json({
    message: "Course deleted successfully",
  });
};

module.exports = {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};