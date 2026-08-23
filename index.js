const express = require("express");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/courses", courseRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});