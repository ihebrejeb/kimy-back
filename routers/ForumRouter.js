var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const forums = require("../models/ForumModel");
const mongoose = require("mongoose");
var cron = require("node-cron");
const authController = require("../controllers/authController");

const ForumController = require("../controllers/ForumController");
  router.use(authController.protect);

router
  .route("/")
  
  .post(ForumController.createforums);


router.route("/sort/:courseid").get(async (req, res, next) => {
  const {courseid} = req.params

  try {
    const doc = await forums.find({ courses : courseid  }).sort({ like: -1 });

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
});
router.route("/sortByViews/:courseid").get( async ( req, res, next) => {
  const {courseid} = req.params

  try {

    const doc = await forums.find({ courses : courseid  }).sort({ views: -1 });

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
})   
router.route("/sortByRate/:courseid").get( async ( req, res, next) => {
  const {courseid} = req.params

  try {

    const doc = await forums.find({ courses : courseid  }).sort({ avg: -1 });

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
})  
router.route("/topPost/:courseid").get( async ( req, res, next) => {
  try {
    const {courseid} = req.params

    const com = forums.comments
    const doc = await forums.find({ courses : courseid  }).sort({ com :-1  }).limit(1);

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
})  

router
  .route("/:id")
  //   .get(ForumController.getforums)
  .patch(ForumController.updateforums)
  .delete(ForumController.deleteforums);
let Filter = require("bad-words");

router.route("/:id").get(async (req, res, next) => {
  try {
    const forum = await forums.findById(req.params.id);
    if (!forum) {
      return res.status(404).json({ msg: "Post not found" });
    }
    forum.views = forum.views + 1;
    console.log("views  incremented to " + forum.views);
    forum.save();
    res.status(200).json({
      status: "success",
      data: forum,
    });
  } catch (error) {
    next(error);
  }
});

router.route("/getbyCourse/:courseid").get(ForumController.getAllforums)


router
  .route("/comment/:id")
  .post(
    [[check("text", "Text is required").not().isEmpty()]],
    async (req, res, next) => {
      const errors = validationResult(req);
      const user = req.user 
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const user = req.user
        const forum = await forums.findById(req.params.id);
        var filter = new Filter();
        const newComment = {
          text: req.body.text,
          name: user.username,
          avatar: user.avatar,
          user: req.user.id
        };
        var x = filter.clean(newComment.text);

        newComment.text = x;

        forum.comments.unshift(newComment);
        await forum.save();
        res.json(forum.comments);
      } catch (error) {
        next(error);
      }
    }
  );
router.route("/comment/:id/:comment_id").delete(async (req, res, next) => {
  try {
    const forum = await forums.findById(req.params.id);
    const comment = forum.comments.find(
      (comment) => comment.id == req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found " });
    }

    const removeIndex = forum.comments;

    forum.comments.splice(removeIndex, 1);

    await forum.save();
    res.json(forum.comments);
  } catch (error) {
    next(error);
  }
});
router.route("/like/:id").patch(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No Post Found with id : ${id} ");
    const forum = await forums.findById(id);
    const updatedPost = await forums.findByIdAndUpdate(
      id,
      { like: forum.like + 1 },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
});

//unlike post
router.route("/unlike/:id").patch(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No Post Found with id : ${id} ");
    const forum = await forums.findById(id);
    const updatedPost = await forums.findByIdAndUpdate(
      id,
      { like: forum.like - 1 },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
});
router.route("/rate/:id").post(async (req, res) => {
  try {
    const forum = await forums.findById(req.params.id);

    // if (post.rate.filter(rate => rate.user.toString() === req.user.id).length > 0) {
    //     return res.status(400).json({ msg: 'Post already rated' });
    // }
    // post.rate.unshift({ user: req.user.id });

    const newrate = {
      rating: req.body.rating,
    };
    forum.rate.unshift(newrate);
    console.log(forum);
    // await post.save();
    let sum = 0;
    forum.rate.forEach((r) => {
      sum = sum + r.rating;
    });
    forum.avg = sum / forum.rate.length;

    console.log(forum.avg);
    await forum.save();
    res.json(forum.rate);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("server Error");
  }
});

router.route("/search/:search/:courseid").get(async (req, res) => {
  try {
    const {courseid} = req.params

    const { search } = req.params;
    const doc = await forums.find({
      $and: [{ title: { $regex: search, $options: "i" } },
     {
      courses : courseid 
     }],
    });
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
});

cron.schedule('* * * * *', async function () {

    console.log('run every 60 sec')
    const forum = await forums.find();
    forum.forEach(e => {
        if (e.avg < 1) {
            e.remove()
        }
    });
})

module.exports = router;
