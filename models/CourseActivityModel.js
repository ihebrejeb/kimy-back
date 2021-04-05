const mongoose = require("mongoose");

const CourseActivity = mongoose.Schema({
  title: String,
  files: [{
            url:String,
           name:String
          }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "room" }],
  description: String,
  nbSeances: Number,
  ressources: String,
  comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
  date: {type:Date,default:Date.now()}
});

const CourseActivities = mongoose.model("CourseActivity", CourseActivity);
module.exports = CourseActivities;
