const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    roomSID: { type: String, unique: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
    compositionSID: String,
    recordingStatus: { type: Boolean, default: false },
    processing: { type: Boolean, default: false },
    stats: {
      totalFrames: Number,
      frames: [
        {
          frame: String,
          users: [String],
        },
      ],
    },
  },
  { timestamps: true }
);

const room = mongoose.model("room", Schema);
module.exports = room;
