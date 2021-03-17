var express = require("express");
var router = express.Router();

const controller = require("../controllers/onlineSessionController");

router.route("/").get(controller.getAllSessions).post(controller.createSession);
router
  .route("/:id")
  .get(controller.getOneSession)
  .patch(controller.updateSession)
  .delete(controller.deleteSession);
router.route("/course/:id").get(controller.getSessionsByCourseId);
router.route("/active/course/:id").get(controller.getActiveSessionsByCourseId);

module.exports = router;
