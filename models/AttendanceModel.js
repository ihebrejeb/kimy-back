const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: "room" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const AttendanceModel = mongoose.model("attendance", Schema);
module.exports = AttendanceModel;
