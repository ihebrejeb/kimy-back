const CourseActivity = require("../models/CourseActivityModel");
const base = require("./baseController");

exports.GetAllActivities = base.getAll(CourseActivity);
exports.GetActivity = base.getOne(CourseActivity);
exports.CreateActivity = base.createOne(CourseActivity);
exports.DeleteActivity = base.deleteOne(CourseActivity);
exports.UpdateActivity = base.updateOne(CourseActivity);
