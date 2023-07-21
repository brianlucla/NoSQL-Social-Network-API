const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
  reactionBody:{
    type:String,
    required:true,
    max_length: 200
  },
  username:{
    type:String,
    required: true,
  },
  createdAt:{
    type:Date,
    default: Date.now,
    // getter method ?
    get: (createdAt) => {

    }
  }
  },
  {
    toJSON:{
      getters:true,
    }
  }
);

module.exports = reactionSchema;