const mongoose = require("mongoose");

const CourseActivity = mongoose.Schema({
  title: String,
  files: [{
            url:String,
           name:String
          }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "room" }],
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],

  description: String,
  nbSeances: Number,
  ressources: String,
  comments: [{content:String,date:{type:Date,default:Date.now()}}],
  date: {type:Date,default:Date.now()}
});
/// missing the course ID 
const CourseActivities = mongoose.model("CourseActivity", CourseActivity);
module.exports = CourseActivities;
