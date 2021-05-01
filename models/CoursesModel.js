const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const randtoken = require('rand-token');

const coursesSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  title: String,
  message: String,
  secretCode: {
    type : String,
    default: function() {
      return randtoken.generate(64);
  }
    
  } ,
  Students:

   [ 
      
        { type: mongoose.Schema.Types.ObjectId, ref: "User" }
         
  ],
  

  
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const courses = mongoose.model("courses", coursesSchema);
module.exports = courses;
