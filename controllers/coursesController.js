const base = require("./baseController");
const courses = require("../models/coursesModel");
const mongoose = require("mongoose"); 

exports.getAllcourses = base.getAll(courses) ;
exports.getCourse = base.getOne(courses);

exports.createCourse = base.createOne(courses);
// exports.deleteCourse = base.deleteOne(courses);
exports.updateCourse = base.updateOne(courses) ; 


exports.deleteCourse = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No course with id: ${id}`);

    await courses.findByIdAndRemove(id);

    res.json({ message: "course deleted successfully." });
}