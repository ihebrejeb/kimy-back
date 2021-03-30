const base = require("./baseController");
const CoursesActivity = require("../models/CourseActivityModel");
const mongoose = require("mongoose");

exports.getAllcoursesActivities = base.getAll(CoursesActivity);
exports.getCourseActivities = base.getOne(CoursesActivity);

exports.createCourseActivities = base.createOne(CoursesActivity);
// exports.deleteCourse = base.deleteOne(courses);
exports.updateCourseActivities = base.updateOne(CoursesActivity);

exports.deleteCourseActivities = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No course with id: ${id}`);

  await CoursesActivity.findByIdAndRemove(id);

  res.json({ message: "course deleted successfully." });
};
