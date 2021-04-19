var express = require("express");
var router = express.Router();

const liveQuizzController = require("../controllers/liveQuizzController");


router.route("/").get(liveQuizzController.getAllliveQuizz) 
                .post(liveQuizzController.createliveQuizz)
router
  .route("/:id")
  .get(liveQuizzController.getliveQuizz)
  .patch(liveQuizzController.updateliveQuizz)
  .delete(liveQuizzController.deleteliveQuizz);


module.exports = router;
