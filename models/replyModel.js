const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    reply: {
        type: String
    },
    userName: {
        type: String
    },
    createdTime: {
        type: String
    },
    likers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    dislikers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    totalLikes: {
        type: Number
    },
    totalDislike: {
        type: Number
    }
}, { timestamps: true });

const Reply = mongoose.model('replies', replySchema);

module.exports = Reply;