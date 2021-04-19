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

router.route("/sort").get(async (req, res, next) => {
  try {
    const doc = await forums.find().sort({ like: -1 });

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
