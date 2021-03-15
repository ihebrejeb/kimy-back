const base = require("./baseController");
const courses = require("../models/coursesModel");

exports.getAllcourses = base.getAll(courses) ;
exports.getCourse = base.getOne(courses);

exports.createCourse = base.createOne(courses);
exports.deleteCourse = base.deleteOne(courses);
exports.updateCourse = base.updateOne(courses)
