const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/classController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const { validateClass } = require("../validators/classValidator");

router.use(authenticate);

router.post("/", authorize("admin"), validateClass, ctrl.createClass);
router.get("/", authorize("admin", "teacher", "student"), ctrl.getAllClasses);
router.get("/:id", authorize("admin", "teacher", "student"), ctrl.getClassById);
router.put("/:id", authorize("admin"), ctrl.updateClass);
router.delete("/:id", authorize("admin"), ctrl.deleteClass);

module.exports = router;