var express = require("express");
var router = express.Router();
const { check , validationResult} = require('express-validator')
const forums = require("../models/ForumModel");
const mongoose = require("mongoose"); 

const ForumController = require("../controllers/ForumController");


router.route("/").get(ForumController.getAllforums) 
                .post(ForumController.createforums)
router
  .route("/:id")
  .get(ForumController.getforums)
  .patch(ForumController.updateforums)
  .delete(ForumController.deleteforums);
  let Filter = require('bad-words')

  
  router.route('/comment/:id').post([ [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const forum = await forums.findById(req.params.id);
        var filter = new Filter();
        const newComment = {
            text: req.body.text,
           
        }
        var x = filter.clean(newComment.text);

        newComment.text = x;

        forum.comments.unshift(newComment);
        await forum.save();
        res.json(forum.comments);


    } catch (error) {
        next(error)  
  }

})
router.route('/comment/:id/:comment_id').delete( async (req, res, next) => {
    try {
        const forum = await forums.findById(req.params.id);
        const comment = forum.comments.find(comment => comment.id == req.params.comment_id)
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found ' })
        }
        
        const removeIndex = forum.comments
           
        forum.comments.splice(removeIndex, 1)

        await forum.save();
        res.json(forum.comments);
    } catch (error) {
       next(error)
    }

})
router.route('/like/:id').patch( async (req, res,next) => {
   try {  
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post Found with id : ${id} ');
    const forum = await forums.findById(id);
    const updatedPost =await forums.findByIdAndUpdate(id, {like : forum.like + 1}, { new: true });
    res.json(updatedPost);
        
    }
  
    catch (error) {
        next(error)
    }

})
   



//unlike post 
router.route('/unlike/:id').patch( async (req, res,next) => {
    try {  
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post Found with id : ${id} ');
        const forum = await forums.findById(id);
        const updatedPost =await forums.findByIdAndUpdate(id, {like : forum.like - 1}, { new: true });
        res.json(updatedPost);
            
        }
      
        catch (error) {
            next(error)
        }
    }

)
router.route('/rate/:id').post( async (req, res) => {

    try {
        const forum = await forums.findById(req.params.id);

        // if (post.rate.filter(rate => rate.user.toString() === req.user.id).length > 0) {
        //     return res.status(400).json({ msg: 'Post already rated' });
        // }
        // post.rate.unshift({ user: req.user.id });

        const newrate = {
            rating: req.body.rating,
        }
        forum.rate.unshift(newrate);
        console.log(forum)
        // await post.save();
        let sum = 0;
        forum.rate.forEach(r => {
            sum = sum + r.rating

        });
        forum.avg = sum / forum.rate.length;

        console.log(forum.avg);
        await forum.save();
        res.json(forum.rate)
    } catch (error) {

        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('server Error')
    }
})



 
module.exports = router;
