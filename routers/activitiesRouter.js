var express = require("express");
var router = express.Router();

const Activities = require("../controllers/activitiesController");

router.route("/").get(Activities.getAllActivities) 
                .post(Activities.createActivity)
router
  .route("/:id")
  .get(Activities.getActivities)
  .patch(Activities.updateActivities)
  .delete(Activities.deleteActivities);


module.exports = router;

