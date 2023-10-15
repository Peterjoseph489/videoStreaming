const express = require('express');
const { signUp, adminVideo } = require('../controllers/adminController');
const { authAdmin } = require('../middlewares/authorization');

const adminRoute = express.Router();

adminRoute.route("/signup").post(signUp);
adminRoute.route("/admin/playlists/:adminId").get(authAdmin, adminVideo);

module.exports = adminRoute;