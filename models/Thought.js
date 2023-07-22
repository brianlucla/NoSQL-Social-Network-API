const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dayjs = require('dayjs');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => {
        return dayjs(createdAt).format(
          "MMMM D, YYYY [at] hh:mm A"
        );
      },
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters:true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;