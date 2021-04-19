var express = require("express");
var router = express.Router();

const Activities = require("../controllers/CourseActivityController");
const activity = require("../models/CourseActivityModel");
router.route("/sort").get(async (req, res, next) => {
  try {
    const doc = await activity.find().sort({ title: 1 });

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
});
router
  .route("/")
  .get(Activities.GetAllActivities)
  .post(Activities.CreateActivity);

router
  .route("/:id")
  .delete(Activities.DeleteActivity)
  .patch(Activities.UpdateActivity)
  .get(Activities.GetActivity);

router.route("/search/:search").get(async (req, res, next) => {
  try {
    const { search } = req.params;
    const doc = await activity.find({
      $or: [{ title: { $regex: search, $options: "i" } }],
    });
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
