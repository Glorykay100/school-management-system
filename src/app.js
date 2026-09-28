require("dotenv").config();
const express = require("express");
const logger = require("./middleware/logger");
const { apiLimiter } = require("./middleware/rateLimiter");
const { notFound } = require("./middleware/errorHandler");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// -------- GLOBAL MIDDLEWARE --------
app.use(express.json());
app.use(logger);
app.use("/api", apiLimiter);

// -------- ROUTES --------
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use("/api/classes", require("./routes/classRoutes"));
app.use("/api/subjects", require("./routes/subjectRoutes"));
app.use("/api/results", require("./routes/resultRoutes"));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "School Management API is running" });
});

// -------- 404 + ERROR HANDLERS --------
app.use(notFound);
app.use(errorHandler);

module.exports = app;