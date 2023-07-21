const { Schema, model, SchemaTypes } = require('mongoose');
require('mongoose-type-email')

const userSchema = new Schema(
  {
    username:{
      type:String,
      required:true,
      trim: true,
      unique:true
    },
    email:{
      type: SchemaTypes.Email,
      required:true,
      unique:true,
    },
    thoughts:[
      {
        type:Schema.Types.ObjectId,
        ref:'Thought'
      }
    ], 
    friends:[
      {
        type: Schema.Types.ObjectId,
        ref:'User'
      }
    ]
  },
  {
    toJSON:{
      virtuals:true
    }
  }
);

userSchema.virtual('friendCount').get(function(){
  return this.friends.length;
});


const User = model('User', userSchema);


module.exports = User;