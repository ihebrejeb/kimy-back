var express = require("express");
const {
  getAttendanceByRoomId,
  markAttendance,
  teacherMarkAttendance,
  teacherUnMarkAttendance,
} = require("../controllers/attendanceController");
const authController = require("../controllers/authController");

var router = express.Router();

router.use(authController.protect);

router.route("/:roomId").get(getAttendanceByRoomId);
router.route("/").post(markAttendance);
router.route("/teacher").post(teacherMarkAttendance);
router.route("/teacher/unmark").post(teacherUnMarkAttendance);
module.exports = router;
