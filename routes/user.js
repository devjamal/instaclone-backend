const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")
const User = mongoose.model("User")


router.get('/user/:id',(req, res)=>
{
    User.findOne({_id : req.param.id})
    .select("-password")
    then(user=>{
        Post.find({postedBy: req.param.id})
        .populate("postedBy" ,"_id name")
        .exec((err ,post)=>{
                if(err){
                return res.status(422).json({error: err})
        }
        res.json({user , post})
    })
    .catch(err=>{
        return res.status(404).json({error : "user not found"})
    })
})


module.exports = router
