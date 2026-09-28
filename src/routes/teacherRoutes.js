const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/teacherController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const { validateTeacher } = require("../validators/teacherValidator");

router.use(authenticate);

router.post("/", authorize("admin"), validateTeacher, ctrl.createTeacher);
router.get("/", authorize("admin"), ctrl.getAllTeachers);
router.get("/:id", authorize("admin"), ctrl.getTeacherById);
router.put("/:id", authorize("admin"), ctrl.updateTeacher);
router.delete("/:id", authorize("admin"), ctrl.deleteTeacher);

module.exports = router;