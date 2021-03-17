const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
    date: {
      type: Date,
      default: Date.now,
    },

    isOver: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const OnlineSession = mongoose.model("onlineSession", Schema);
module.exports = OnlineSession;
