const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/subjectController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const { validateSubject } = require("../validators/subjectValidator");

router.use(authenticate);

router.post("/", authorize("admin"), validateSubject, ctrl.createSubject);
router.get("/", authorize("admin", "teacher", "student"), ctrl.getAllSubjects);
router.get("/:id", authorize("admin", "teacher", "student"), ctrl.getSubjectById);
router.put("/:id", authorize("admin"), ctrl.updateSubject);
router.delete("/:id", authorize("admin"), ctrl.deleteSubject);

module.exports = router;