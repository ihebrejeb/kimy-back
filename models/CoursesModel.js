const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const value = Math.floor(Math.random()*100)
const coursesSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  title: String,
  message: String,
  secretCode: {
    Number,
    
  } ,
  Students : [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ]

  ,
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const courses = mongoose.model("courses", coursesSchema);
module.exports = courses;
