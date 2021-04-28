const base = require("./baseController");
const forums = require("../models/ForumModel");
const mongoose = require("mongoose"); 


// exports.getAllforums = base.getAll(forums) ;
exports.getforums = base.getOne(forums);

// exports.createforums = base.createOne(forums);
exports.updateforums = base.updateOne(forums) ; 



exports.deleteforums = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No course with id: ${id}`);

    await forums.findByIdAndRemove(id);

    res.json({ message: "forum deleted successfully." });
}
exports.getAllforums  = async (req, res, next) => {
    try {
      const {courseid} = req.params
      const user = req.user
      const doc = await forums.find({ courses : courseid  }).sort({ _id: -1 });
  
  
      res.status(200).json({
        status: "success",
        results: doc.length,
        data: doc,
      });
    } catch (error) {
      next(error);
    }
  };

  
exports.createforums =  async (req, res, next) => {
    let Filter = require('bad-words')

    try {
        const user = req.user
        var filter = new Filter();

        const newForum = new forums({
            title: req.body.title,
            text: req.body.text,
            name: user.username,
            avatar: user.avatar,
            courses : req.body.courses,
            user: req.user.id
        })
        var x = filter.clean(newForum.text);
        var y = filter.clean(newForum.title)
        newForum.text = x;
        newForum.title = y;

      const doc = await newForum.save({...req.body , creator : user });
  
      res.status(201).json({
        status: "success",
        data: doc
       
      });
    } catch (error) {
      next(error);
    }
  };