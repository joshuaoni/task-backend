const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

module.exports = app;

