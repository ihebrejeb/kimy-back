var express = require("express");
var router = express.Router();

const coursesController = require("../controllers/coursesController");

router
  .route("/")
  .get(coursesController.getAllcourses)
  .post(coursesController.createCourse);
router
  .route("/:id")
  .get(coursesController.getCourse)
  .patch(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
