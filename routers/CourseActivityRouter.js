var express = require("express");
var router = express.Router();

const Activities = require("../controllers/CourseActivityController");

router
  .route("/")
  .get(Activities.GetAllActivities)
  .post(Activities.CreateActivity);

router
  .route("/:id")
  .delete(Activities.DeleteActivity)
  .patch(Activities.UpdateActivity)
  .get(Activities.GetActivity);

module.exports = router;
