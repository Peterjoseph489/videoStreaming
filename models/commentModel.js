const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  userName: {
    type: String,
  },
  createdTime: {
    type: String
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "replies"
  }],
  likers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }],
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }],
  dislikers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }],
  totalLikes: {
    type: Number,
  },
  totalDislike: {
    type: Number,
  },
}, {
  timestamps: true
});


const Comment = mongoose.model("Comments", commentSchema);

module.exports = Comment;