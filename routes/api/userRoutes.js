const router = require('express').Router();
const User = require('../../models/User');

// finds all users' data
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
      .populate('thoughts');
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// finds a single user's data
router.get('/:userId', async (req, res)=>{
  try {
    const user = await User.findOne({ _id: req.params.userId }).populate(
      "thoughts"
    );
    // return a 404 error if thoughtData doesn't exist
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// creates a user
router.post('/', async(req, res)=>{
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//updates a user based on request parameters
router.put('/:userId', async(req, res)=>{
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true }
    );
    // return a 404 error if thoughtData doesn't exist
    if (!userData) {
      res.status(404).json({ message: "User not found!" });
    }
    res.json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// deletes a user based on request parameters
router.delete('/:userId', async(req, res)=>{
  try {
    const userData = await User.findOneAndDelete(
      { _id: req.params.userId },
      { new: true }
    );
    // return a 404 error if thoughtData doesn't exist
    if (!userData) {
      res.status(404).json({ message: "User not found!" });
    }
    res.json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create a friend in userId document 
router.post('/:userId/friends/:friendsId', async(req, res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendsId } },
      { new: true }
    );
    // return a 404 error if thoughtData doesn't exist
    if (!userData) {
      res.status(404).json({ message: "User not found!" });
    }
    res.json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a friend based on friendsId from request parameters
router.delete('/:userId/friends/:friendsId', async(req, res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendsId } },
      { new: true }
    );
    // return a 404 error if thoughtData doesn't exist
    if (!userData) {
      res.status(404).json({ message: "User not found!" });
    }
    res.json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;