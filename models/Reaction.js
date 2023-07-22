const { Schema, model } = require("mongoose");
const dayjs = require("dayjs");

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      max_length: 200,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // getter method ?
      get: (createdAt) => {
        const formattedDate = dayjs(createdAt).format(
          "MMMM D, YYYY [at] hh:mm A"
        );
        return formattedDate;
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = reactionSchema;
