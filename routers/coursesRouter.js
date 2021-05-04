var express = require("express");
var router = express.Router();
const authController = require("../controllers/authController");

const coursesController = require("../controllers/coursesController");

router.route("/search/:search").get(coursesController.GetCode)
router.use(authController.protect);
router.route("/enroll/:id").post(coursesController.enrollStudent)
router.route("/kick/:id").post(coursesController.kick)


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
