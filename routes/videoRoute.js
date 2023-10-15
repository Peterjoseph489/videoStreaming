const express = require("express");
const {
    uploadVideo,
    watchVideo,
    likeAvideo,
    disLikeAvideo
} = require("../controllers/videoController");
const { authAdmin, authUser } = require("../middlewares/authorization");

const videoRoute = express.Router();

videoRoute.route("/upload/video/:adminId").post(authAdmin, uploadVideo);
videoRoute.route("/video/watch/:userId/:videoId").get(authUser, watchVideo);

videoRoute.route("/video/like/:userId/:videoId").post(authUser, likeAvideo);
videoRoute.route("/video/dislike/:userId/:videoId").post(authUser, disLikeAvideo);



module.exports = videoRoute;   