const Assignment = require("../models/AssignmentModel");
const base = require("./baseController");

exports.GetAllAssignments = base.getAll(Assignment);
exports.GetAssignment = base.getOne(Assignment);
exports.CreateAssignment = base.createOne(Assignment);
exports.DeleteAssignment = base.deleteOne(Assignment);
exports.UpdateAssignment = base.updateOne(Assignment);

exports.getAll = async (req, res, next) => {
  try {
    const { activityid } = req.params;
    const user = req.user;
    const doc = await Assignment.find({ activity: activityid });

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

exports.createAss = async (req, res, next) => {
  try {
    //const user = req.user;
    const newAct = new Assignment({
      title: req.body.title,
      Assignmentfile: req.body.Assignmentfile,
      //name: user.username,
      workFiles: req.body.workFiles,
      CorrectionFile: req.body.CorrectionFile,
      description: req.body.description,
      dateLimite: req.body.dateLimite,
      dateCreation: req.body.dateCreation,

      activity: req.body.activity,
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
