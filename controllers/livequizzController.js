const base = require("./baseController");
const liveQuizz = require("../models/liveQuizzModel");


exports.getAllliveQuizz = base.getAll(liveQuizz) ;
exports.getliveQuizz = base.getOne(liveQuizz);

exports.createliveQuizz = base.createOne(liveQuizz);
exports.deleteliveQuizz = base.deleteOne(liveQuizz);
exports.updateliveQuizz = base.updateOne(liveQuizz) ; 