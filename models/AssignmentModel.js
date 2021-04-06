const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  
  comment: String,
});

const Assignments = mongoose.model("Assignment", Assignment);
module.exports = Assignments;
