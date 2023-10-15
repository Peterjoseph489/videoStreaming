const dotenv = require('dotenv');
dotenv.config();

const Cloudinary = require('cloudinary').v2;

Cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SEC
});


module.exports = Cloudinary;