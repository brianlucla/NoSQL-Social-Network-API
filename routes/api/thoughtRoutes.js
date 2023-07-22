const router = require('express').Router();
const { Types } = require('mongoose');
const Thought = require('../../models/Thought');
const User = require('../../models/User');

// get route for all Thoughts
router.get('/', async (req, res)=>{
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get route for a single Thought
router.get('/:thoughtId', async (req, res) =>{
  try {
    const thought = await Thought.find({ _id: req.params.thoughtId });
    // return a 404 error if thoughtData doesn't exist
    if (!thought) {
      res.status(404).json({ message: "Thought not found!" });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
});

// creating a thought
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

// updating a thought based on request parameter id
router.put('/:thoughtId', async (req, res)=>{
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      req.body,
      { new: true }
    );
    // return a 404 error if thoughtData doesn't exist
    if (!thoughtData) {
      res.status(404).json({ message: "Thought not found!" });
    }
    res.json(thoughtData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// deleted a thought based on request parameter id
router.delete('/:thoughtId', async(req, res)=>{
  try {
    const thoughtData = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });
    // return a 404 error if thoughtData doesn't exist
    if (!thoughtData) {
      res.status(404).json({ message: "Thought not found!" });
    }
    res.json(thoughtData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// creating a reaction to a thought
router.post('/:thoughtId/reactions', async (req,res) => {
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    );
    // return a 404 error if thoughtData doesn't exist
    if (!thoughtData) {
      res.status(404).json({ message: "Thought not found!" });
    }
    res.json(thoughtData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// deleting a reaction
router.delete('/:thoughtId/reactions/:reactionId', async (req,res)=>{
  try {
    const thoughtData = await Thought.findOneAndUpdate({_id:req.params.thoughtId},{$pull:{reactions: {_id:req.params.reactionId}}}, {new:true});

    // return a 404 error if thoughtData doesn't exist
    if (!thoughtData) {
      res.status(404).json({ message: "Thought not found!" });
    }
    res.json(thoughtData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;