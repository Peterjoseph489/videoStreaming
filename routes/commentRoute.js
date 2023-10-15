const express = require('express');
const { authUser, authAdmin } = require('../middlewares/authorization');
const {
    videoComment,
    getComment,
    replyComment,
    likeAcomment,
    disLikeAcomment,
    disLikeAreply
} = require('../controllers/commentController');


commentRoute.route("/video/comment/:userId/:videoId").post(authUser, videoComment);
commentRoute.route("/comment/reply/:userId/:commentId").post(authUser, replyComment);
commentRoute.route("/comment/:userId/:commentId").get(authUser, getComment);

commentRoute.route("/comment/like/:userId/:commentId").post(authUser, likeAcomment);
commentRoute.route("/comment/dislike/:userId/:commentId").post(authUser, disLikeAcomment);

commentRoute.route("/reply/like/:userId/:replyId").post(authUser, likeAreply);
commentRoute.route("/reply/dislike/:userId/:replyId").post(authUser, disLikeAreply);


module.exports = commentRoute;
