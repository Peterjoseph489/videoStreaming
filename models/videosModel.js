const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    tutor: {
        type: String,
        required: [true, 'This field - tutor is required']
    },
    title: {
        type: String,
        required: [true, 'This field - title is required']
    },
    description: {
        type: String,
        required: [true, 'This field - description is required']
    },
    videoFile: {
        type: String
    },
    videoId: {
        type: String
    },
    tags: {
        type: String,
        required: [true, 'This field - tags is required']
    },
    category: {
        type: String,
        required: [true, 'This field - category is required']
    },
    minutes: {
        type: Date,
        required: [true, 'This field - minutes is required']
    },
    seconds: {
        type: Date
    },
    hours: {
        type: Date
    },
    userView: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    views: {
        type: Number
    },
    playlists: {
        type: String
    },
    likers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    totalLikes: {
        type: Number,
    },
    totalDislike: {
        type: Number,
    },
    dislikers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admins"
    }
}, { timestamps: true });


const Videos = mongoose.model("Videos", videoSchema);

module.exports = Videos;