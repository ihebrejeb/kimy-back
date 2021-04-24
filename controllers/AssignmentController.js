const Assignment = require("../models/AssignmentModel");
const base = require("./baseController");

exports.GetAllAssignments = base.getAll(Assignment);
exports.GetAssignment = base.getOne(Assignment);
exports.CreateAssignment = base.createOne(Assignment);
exports.DeleteAssignment = base.deleteOne(Assignment);
exports.UpdateAssignment = base.updateOne(Assignment);
