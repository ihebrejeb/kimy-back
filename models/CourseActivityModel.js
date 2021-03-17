const mongoose = require("mongoose");

const CourseActivity = mongoose.Schema({
  title: String,
  file: String,
  description: String,
  rate: Number,
  comment: String,
  nbSeances: Number,
  start: Date,
  end: Date,
  ressources: String,
});

const CourseActivities = mongoose.model("CourseActivity", CourseActivity);
module.exports = CourseActivities;
