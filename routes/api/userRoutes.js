const router = require('express').Router();
const User = require('../../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
      .populate('thoughts');
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:userId', async (req, res)=>{
  try {
    const user = await User.findOne({_id:req.params.userId})
      .populate('thoughts');
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async(req, res)=>{
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:userId', async(req, res)=>{
  try {
    const userData = await User.findOneAndUpdate({_id: req.params.userId},
    req.body
    );
    res.json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:userId', async(req, res)=>{
  try {
    const userData = await User.findOneAndDelete({_id: req.params.userId});
    res.json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/:userId/friends/:friendsId', async(req, res) => {
  try {
    
  } catch (error) {
    
  }
});

router.delete('/:userId/friends/:friendsId', async(req, res) => {
  try {
    
  } catch (error) {
    
  }
});

module.exports = router;