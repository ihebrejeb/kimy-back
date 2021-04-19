const mongoose = require("mongoose");

const Assignment = mongoose.Schema({
  activity: {
                type: Schema.Types.ObjectId,
                ref: 'CourseActivity',
            },
  title: String,
  assignmentFile: String,
  workFiles : [
    {user: {type: Schema.Types.ObjectId, ref: 'User'},
     file:{url:String,
           date:{type: Date,default: Date.now}
          }
    }], 
  correctionFile : String ,
  description: String,
 dateCreation: {
    type: Date,
    default: new Date(),
  },
  dateLimite : Date ,
  
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
    ],});

const Assignments = mongoose.model("Assignment", Assignment);
module.exports = Assignments;
