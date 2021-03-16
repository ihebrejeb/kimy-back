const base = require("./baseController");
const activities = require("../models/ActivitiesModel");

exports.getAllActivities = base.getAll(activities) ;
exports.getActivities = base.getOne(activities);

exports.createActivity = base.createOne(activities);
exports.deleteActivities = base.deleteOne(activities);
exports.updateActivities = base.updateOne(activities)