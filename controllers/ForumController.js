const base = require("./baseController");
const forums = require("../models/ForumModel");
const mongoose = require("mongoose"); 


exports.getAllforums = base.getAll(forums) ;
exports.getforums = base.getOne(forums);

exports.createforums = base.createOne(forums);
exports.updateforums = base.updateOne(forums) ; 



exports.deleteforums = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No course with id: ${id}`);

    await forums.findByIdAndRemove(id);

    res.json({ message: "forum deleted successfully." });
}