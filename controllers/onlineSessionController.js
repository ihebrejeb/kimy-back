const base = require("./baseController");
const os = require("../models/OnlineSessionModel");

exports.getAllSessions = base.getAll(os);
exports.getOneSession = base.getOne(os);
exports.createSession = base.createOne(os);
exports.deleteSession = base.deleteOne(os);
exports.updateSession = base.updateOne(os);
exports.getSessionsByCourseId = async (req, res, next) => {
  try {
    const doc = await os.find({ course: req.params.id });

    if (!doc) {
      return next(
        new AppError(404, "fail", "No document found with that id"),
        req,
        res,
        next
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.getActiveSessionsByCourseId = async (req, res, next) => {
  try {
    const doc = await os.find({ course: req.params.id, isOver: false });

    if (!doc) {
      return next(
        new AppError(404, "fail", "No document found with that id"),
        req,
        res,
        next
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  } catch (error) {
    next(error);
  }
};
