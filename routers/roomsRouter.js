const express = require("express");
const router = express.Router();
const room = require("../models/Room");

router.route("/").post((req, res) => {
  const { roomSID, course } = req.body;
  room.create({ roomSID, course });
  res.json("done");
});
router.route("/updateStatus/:roomId").post(async (req, res) => {
  const { roomId } = req.params;
  await room.findOneAndUpdate({ roomSID: roomId }, { recordingStatus: true });
  res.json("done");
});
router.route("/:courseid").get(async (req, res) => {
  const { courseid } = req.params;
  const data = await room.find({ course: courseid });
  res.json(data);
});

module.exports = router;
