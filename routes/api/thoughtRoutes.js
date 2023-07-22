const router = require('express').Router();
const { Types } = require('mongoose');
const Thought = require('../../models/Thought');
const User = require('../../models/User');

router.get('/', async (req, res)=>{
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:thoughtId', async (req, res) =>{
  try {
    const thought = await Thought.find({_id:req.params.thoughtId});
    res.json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res)=>{
  try {
    const thought = await Thought.create(req.body);
    const userData = await User.findOneAndUpdate({_id:req.body.userId}, {$push: {
      thoughts: thought._id
    }});

    res.json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:thoughtId', async (req, res)=>{
  try {
    const thoughtData = await Thought.findOneAndUpdate({_id:req.params.thoughtId}, req.body);
    res.json(thoughtData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:thoughtId', async(req, res)=>{
  try {
    const thoughtData = await Thought.findOneAndDelete({_id:req.params.thoughtId});
    res.json(thoughtData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/:thoughtId/reactions', async (req,res) => {
  try {
    const thoughtData = await Thought.findOneAndUpdate({_id:req.params.thoughtId}, {$push:{reactions:req.body}});
    res.json(thoughtData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req,res)=>{
  try {
    const thoughtData = await Thought.findOneAndUpdate({_id:req.params.thoughtId},{$pull:{reactions: {_id:req.params.reactionId}}}, {new:true});
    res.json(thoughtData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;