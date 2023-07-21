const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText:{
      type:String,
      required:true,
      max_length: 280,
    },
    createdAt:{
      type:Date,
      default:Date.now,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON:{
      virtuals: true,
    }
  });

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;