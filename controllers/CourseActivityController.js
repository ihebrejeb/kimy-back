const CourseActivity = require("../models/CourseActivityModel");
const base = require("./baseController");

exports.GetAllActivities = base.getAll(CourseActivity);
exports.GetActivity = base.getOne(CourseActivity);
exports.CreateActivity = base.createOne(CourseActivity);
exports.DeleteActivity = base.deleteOne(CourseActivity);
exports.UpdateActivity = base.updateOne(CourseActivity);

exports.getAll = async (req, res, next) => {
  try {
    const { courseid } = req.params;
    const user = req.user;
    const doc = await CourseActivity.find({ courses: courseid });

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

exports.createAct = async (req, res, next) => {
  try {
    //const user = req.user;
    const newAct = new CourseActivity({
      title: req.body.title,
      file: req.body.file,
      //name: user.username,
      description: req.body.description,
      nbSeances: req.body.nbSeances,
      ressources: req.body.ressources,
      courses: req.body.courses,
      // user: req.user.id,
    });

    const doc = await newAct.save({ ...req.body });

    res.status(201).json({
      status: "success",
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};
