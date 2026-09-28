const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/resultController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const { validateResult } = require("../validators/resultValidator");

router.use(authenticate);

router.post("/", authorize("admin", "teacher"), validateResult, ctrl.createResult);
router.get("/", authorize("admin", "teacher", "student"), ctrl.getAllResults);
router.get("/:id", authorize("admin", "teacher", "student"), ctrl.getResultById);
router.put("/:id", authorize("admin", "teacher"), ctrl.updateResult);
router.delete("/:id", authorize("admin"), ctrl.deleteResult);

module.exports = router;