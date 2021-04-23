var express = require("express");
var router = express.Router();
var assignment = require("../models/AssignmentModel");
const Assignments = require("../controllers/AssignmentController");
router.route("/sortAsc").get(async (req, res, next) => {
  try {
    const doc = await assignment.find().sort({ dateLimite: 1 });

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
});
router.route("/sortDesc").get(async (req, res, next) => {
  try {
    const doc = await assignment.find().sort({ dateLimite: -1 });

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
});
router.route("/:id").get(async (req, res, next) => {
  try {
    const forum = await assignment.findById(req.params.id);
    if (!forum) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(200).json({
      status: "success",
      data: forum,
    });
  } catch (error) {
    next(error);
  }
});

router
  .route("/")
  .get(Assignments.GetAllAssignments)
  .post(Assignments.CreateAssignment);

router
  .route("/:id")
  .delete(Assignments.DeleteAssignment)
  .patch(Assignments.UpdateAssignment)
  .get(Assignments.GetAssignment);
router.route("/searchassignment/:search").get(async (req, res, next) => {
  try {
    const { search } = req.params;
    const doc = await assignment.find({
      $or: [{ title: { $regex: search, $options: "i" } }],
    });
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
