const base = require("./baseController");
const courses = require("../models/coursesModel");
const mongoose = require("mongoose"); 

// exports.getAllcourses = base.getAll(courses) ;
exports.getCourse = base.getOne(courses);

// exports.createCourse = base.createOne(courses);
// exports.deleteCourse = base.deleteOne(courses);
exports.updateCourse = base.updateOne(courses) ; 


exports.deleteCourse = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No course with id: ${id}`);

    await courses.findByIdAndRemove(id);

    res.json({ message: "course deleted successfully." });
}

exports.getAllcourses= async( req , res , next) => {
    try {
         const user =  req.user ;

         const doc = await courses.find({ creator: user }).sort({ _id: -1 }).populate("creator");
    
    
        res.status(200).json({
          status: "success",
          results: doc.length,
          data: doc,
        });
      } catch (error) {
        next(error);
      }
}

exports.createCourse= async( req , res, next) => {
    
try {
    const user = req.user 
    
    const doc = await courses.create({...req.body , creator : user });

    res.status(201).json({
      status: "success",
      data: doc
     
    });
  } catch (error) {
    next(error);
  }
}
