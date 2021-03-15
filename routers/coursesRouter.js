var express = require("express");
var router = express.Router();

const coursesController = require("../controllers/coursesController");
;
router.post("/add" , coursesController.createCourse)
router.route("/").get(coursesController.getAllcourses)
router
  .route("/:id")
  .get(coursesController.getCourse)
  .patch(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);


module.exports = router;
