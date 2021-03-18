const base = require("./baseController");
const forums = require("../models/ForumModel");


exports.getAllforums = base.getAll(forums) ;
exports.getforums = base.getOne(forums);

exports.createforums = base.createOne(forums);
exports.deleteforums = base.deleteOne(forums);
exports.updateforums = base.updateOne(forums) ; 