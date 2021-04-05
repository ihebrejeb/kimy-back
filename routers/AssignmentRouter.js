var express = require("express");
var router = express.Router();

const Assignments = require("../controllers/AssignmentController");

router
  .route("/")
  .get(Assignments.GetAllAssignments)
  .post(Assignments.CreateAssignment);

router
  .route("/:id")
  .delete(Assignments.DeleteAssignment)
  .patch(Assignments.UpdateAssignment)
  .get(Assignments.GetAssignment);

module.exports = router;
