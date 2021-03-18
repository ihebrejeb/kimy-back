var express = require("express");
var router = express.Router();

const ForumController = require("../controllers/ForumController");


router.route("/").get(ForumController.getAllforums) 
                .post(ForumController.createforums)
router
  .route("/:id")
  .get(ForumController.getforums)
  .patch(ForumController.updateforums)
  .delete(ForumController.deleteforums);


module.exports = router;
