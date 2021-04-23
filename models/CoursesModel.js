const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const coursesSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  title: String,
  message: String,
  tags: [String],
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const courses = mongoose.model("courses", coursesSchema);
module.exports = courses;
