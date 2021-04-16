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

  
router.route("/search/:search").get(async (req, res) => {
  try {
    const { search } = req.params;
    const doc = await forums.find({
      $or: [{ title: { $regex: search, $options: "i" } }],
    });
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
