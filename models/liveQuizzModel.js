const mongoose = require("mongoose");
const validator = require("validator");

const liveQuizzSchema = new mongoose.Schema({
    roomID: {
        type: String,
      },
    question: {
    type: String,
    required: [true, "Please fill your question"],
  },
  optionOne: {
    type: String,
    required: [true, "Minimum two options"],
  },
  optionTwo: {
    type: String,
    required: [true, "Minimum two options"],
  },
  optionThree: {
    type: String,
  },
  optionFour: {
    type: String,
  },
  optionFive: {
    type: String,
  },
  optionCorrect: {
    type: String,
  },
  answer: [{
    username: String,
    answervalue: String,
    correct: Boolean,
  }],
  
});


const LiveQuizz = mongoose.model("liveQuizz", liveQuizzSchema);
module.exports = LiveQuizz;
