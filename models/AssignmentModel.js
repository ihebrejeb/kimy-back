const mongoose = require("mongoose");

const Assignment = mongoose.Schema({
  title: String,
  assignmentFile: String,
  workFile : String , 
  correctionFile : String 
  description: String,
 dateCreation: {
    type: Date,
    default: new Date(),
  },
  dateLimite : Date 
  
  comment: String,
});

const Assignments = mongoose.model("Assignment", Assignment);
module.exports = Assignments;
