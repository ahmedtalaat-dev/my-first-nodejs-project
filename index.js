const express = require("express");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/courses", courseRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const user = "ahmedtalaatali04_db_user";
const password = "5Eh6TTXnqASdUtUY";
const url = "mongodb+srv://ahmedtalaatali04_db_user:5Eh6TTXnqASdUtUY@learn-mongo.ir0ey0a.mongodb.net/?appName=learn-mongo";