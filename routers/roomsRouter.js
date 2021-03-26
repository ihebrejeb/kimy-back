const express = require("express");
const router = express.Router();
const room = require("../models/Room");

router.route("/").post(async (req, res) => {
  const { roomSID, course } = req.body;
  const doc = await room.findOne({ roomSID: roomSID });
  if (!doc) await room.create({ roomSID, course });
  res.json("done");
});
router.route("/updateStatus/:roomId").post(async (req, res) => {
  const { roomId } = req.params;
  const doc = await room.findOne({ roomSID: roomId });
  doc.recordingStatus = true;
  await doc.save();
  res.json("done");
});
router.route("/:courseid").get(async (req, res) => {
  const { courseid } = req.params;
  const data = await room.find({ course: courseid });
  res.json(data);
});
router.route("/:roomSID").delete(async (req, res) => {
  const { roomSID } = req.params;
  const data = await room.deleteOne({ roomSID });
  res.json(data);
});
module.exports = router;
