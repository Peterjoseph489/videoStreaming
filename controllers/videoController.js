const Cloudinary = require('../helpers/cloudinary');
const Videos = require('../models/videosModel');
const { getVideoDurationInSeconds } = require('get-video-duration');
const formData = require('formidable');
const Admin = require('../models/adminModel');
const fs = require('fs');
const Users = require('../models/usersModel');


const uploadVideo = async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const theAdmin = await Admin.findById(adminId);
        const { title, description, category, tags } = req.body;

        const file = req.files.videoFile
        // console.log(file);
        if(!file) {
            return res.status(400).json({
                message: 'No Video uploaded!'
            })
        }
        const videoStream = fs.createReadStream(file.tempFilePath);
        Cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: 'video'
        }, async (err, result) => {
            if(err) {
                return res.status(400).json({
                    message: err.message
                })
            } else {
                // console.log(result);
                const theVideo = result.secure_url;
                // console.log(theVideo);

                const duration = await getVideoDurationInSeconds(theVideo);
                // console.log(duration)

                const hours = Math.floor(duration / 3600);
                const minutes = Math.floor((duration % 3600) / 60);
                const seconds = Math.floor(duration % 60);

                const videoData = {
                    title,
                    description,
                    category,
                    videoFile: theVideo,
                    videoId: result.public_id,
                    tags,
                    minutes,
                    seconds,
                    hours,
                    tutor: theAdmin.name
                };
                const createVideo = await Videos.create(videoData);
                theAdmin.video.push(createVideo);
                await theAdmin.save();
                if (!createVideo) {
                    return res.status(400).json({
                        message: 'Error Occured!'
                    })
                } else {
                    return res.status(201).json({
                        data: createVideo
                    })
                }
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 'Failed!'
        })
    }
}




const watchVideo = async (req, res) => {
    try {
      const videoId = req.params.videoId;
      const userId = req.params.userId;
  
      const videoToWatch = await Videos.findById(videoId);
  
      if (!videoToWatch) {
        return res.status(404).json({
          message: "Video not found",
          status: "Failed"
        });
      }
  
      const userViewedVideo = videoToWatch.userView.includes(userId);
  
      if (!userViewedVideo) {
        // Increment Views and mark user as viewed
        await Videos.updateOne(
          { _id: videoId },
          {
            $inc: { views: 1 },
            $push: { userView: userId }
          }
        );
        await Users.updateOne(
          { _id: userId },
          {
            $push: { videos: videoId }
          }
        );
      }
  
      return res.status(200).json({
        data: videoToWatch,
        status: "Success"
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        status: "Failed"
      });
    }
};
  
  
  
const likeAvideo = async (req, res) => {
    try {
      const videoId = req.params.videoId;
      const userId = req.params.userId;
  
      const theVideo = await Videos.findOne({
        _id: videoId,
        likers: userId
      });
  
      if (theVideo) {
        await Videos.updateOne({
          _id: videoId
        }, {
          $pull: {
            likers: userId
          },
          $inc: {
            totalLikes: -1
          }
        })
      } else {
        await Videos.updateOne({
          _id: videoId
        }, {
          $push: {
            likers: userId
          },
          $inc: {
            totalLikes: 1
          }
        })
      }
  
      return res.status(200).json({
        message: "Success!"
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        status: "Failed"
      })
    }
};


const disLikeAvideo = async (req, res) => {
    try {
      const videoId = req.params.videoId;
      const userId = req.params.userId;
  
      const theVideo = await Videos.findOne({
        _id: videoId,
        dislikers: userId
      });
  
      if (theVideo) {
        // Remove user from dislikers and decrease totalDislike count
        await Videos.updateOne(
          { _id: videoId },
          {
            $pull: { dislikers: userId },
            $inc: { totalDislike: -1 }
          }
        );
      } else {
        // Add user to dislikers and increase totalDislike count
        await Videos.updateOne(
          { _id: videoId },
          {
            $push: { dislikers: userId },
            $inc: { totalDislike: 1 }
          }
        );
      }
  
      return res.status(200).json({
        message: "Success!"
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        status: "Failed"
      });
    }
};




module.exports = {
    uploadVideo,
    watchVideo,
    likeAvideo,
    disLikeAvideo
}