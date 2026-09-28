const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/studentController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const { validateStudent } = require("../validators/studentValidator");

router.use(authenticate); // all student routes require auth

router.post("/", authorize("admin"), validateStudent, ctrl.createStudent);
router.get("/", authorize("admin", "teacher"), ctrl.getAllStudents);
router.get("/:id", authorize("admin", "teacher", "student"), ctrl.getStudentById);
router.put("/:id", authorize("admin"), ctrl.updateStudent);
router.delete("/:id", authorize("admin"), ctrl.deleteStudent);

module.exports = router;