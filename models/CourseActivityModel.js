const mongoose = require("mongoose");

const CourseActivity = mongoose.Schema({
  title: String,
  file: String,
  description: String,
  nbSeances: Number,
  ressources: String,

  rate: Number,
  comment: String,
});

const CourseActivities = mongoose.model("CourseActivity", CourseActivity);
module.exports = CourseActivities;
