const express = require('express');
const { signUpUser } = require('../controllers/usersController');

const userRoute = express.Router();

userRoute.route('/signup/user').post(signUpUser);

module.exports = userRoute;