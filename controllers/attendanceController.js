const attendance = require("../models/AttendanceModel");
const room = require("../models/Room");
exports.getAttendanceByRoomId = async (req, res) => {
  const { roomId } = req.params;
  try {
    const attendanceList = await attendance
      .find({ room: roomId })
      .populate("user");
    res.status(200).json({
      status: "success",
      data: attendanceList,
    });
  } catch (error) {
    res.status(400).json({
      status: "bad request",
      message: error.message,
    });
  }
};
exports.markAttendance = async (req, res) => {
  const user = req.user;
  const { roomSID } = req.body;
  const activeRoom = await room.findOne({ roomSID });
  const exists = await attendance.findOne({ room: activeRoom._id, user });
  if (exists) {
    res.status(400).json({
      status: "bad request",
      message: "already marked",
    });
    return;
  }
  try {
    await attendance.create({ room: activeRoom._id, user });
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "bad request",
      message: error.message,
    });
  }
};
exports.teacherMarkAttendance = async (req, res) => {
  const owner = req.user;
  const { roomSID, users } = req.body;
  const activeRoom = await room.findOne({ roomSID }).populate("course");
  /* if(owner._id!==activeRoom.course.owner)
  res.status(400).json({
    status: "bad request",
    message: error.message,
  }); */
  try {
    await users.forEach(async (user) => {
      const exists = await attendance.findOne({ room: activeRoom._id, user });
      if (!exists) await attendance.create({ room: activeRoom._id, user });
    });
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "bad request",
      message: error.message,
    });
  }
};
exports.teacherUnMarkAttendance = async (req, res) => {
  const owner = req.user;
  const { roomSID, users } = req.body;
  const activeRoom = await room.findOne({ roomSID }).populate("course");
  /* if(owner._id!==activeRoom.course.owner)
  res.status(400).json({
    status: "bad request",
    message: error.message,
  }); */
  try {
    await users.forEach(async (user) => {
      const exists = await attendance.deleteOne({ room: activeRoom._id, user });
    });
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "bad request",
      message: error.message,
    });
  }
};
