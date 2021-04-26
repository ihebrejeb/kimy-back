const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Assignment = mongoose.Schema({
  activity: {
    type: Schema.Types.ObjectId,
    ref: "CourseActivity",
  },
  related_activity: String,
  title: String,
  Assignmentfile: [String],
  workFiles: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      file: { url: String, date: { type: Date, default: Date.now } },
    },
  ],
  CorrectionFile: [
    {
      url: String,
      name: String,
    },
  ],
  description: String,

  dateLimite: String,
  dateCreation: {
    type: Date,
    default: Date.now(),
    require: true,
  },

  //  comments: [
  //         {
  //             user: {
  //                 type: Schema.Types.ObjectId,
  //                 ref: 'User'
  //             },
  //             text: {
  //                 type: String,
  //                 required: true
  //             },
  //             name: {
  //                 type: String
  //             },
  //             avatar: {
  //                 type: String
  //             },
  //             date: {
  //                 type: Date,
  //                 default: Date.now
  //             }
  //         }
  //     ],
});

const Assignments = mongoose.model("Assignment", Assignment);
module.exports = Assignments;
