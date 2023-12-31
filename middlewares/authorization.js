const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const Users = require('../models/usersModel');

const authAdmin =  async (req, res, next) => {
    try {
        const adminId = req.params.adminId;
        const confirmAdmin = await Admin.findById(adminId);
        if (!confirmAdmin) {
            return res.status(400).json({
                message: 'This user does not exist!'
            })
        } else {
            const authToken = confirmAdmin.token;
            if (!authToken) {
                return res.status(400).json({
                    message: 'Something is wrong!'
                })
            }
            jwt.verify(authToken, process.env.SESSION_SEC, (error, payload) => {
                if (error) {
                    return res.status(400).json({
                        message: error.message
                    })
                } else {
                    req.user = payload;
                    next()
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
};


const authUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const confirmUsers = await Users.findById(userId);
        if (!confirmUsers) {
            return res.status(400).json({
                message: 'This user does not exist!'
            })
        } else {
            const authToken = confirmUsers.token;
            if (!authToken) {
                return res.status(400).json({
                    message: 'Something is wrong!'
                })
            }
            jwt.verify(authToken, process.env.AUT_SEC_ID, (error, payload) => {
                if (error) {
                    return res.status(400).json({
                        message: error.message
                    })
                } else {
                    req.user = payload;
                    next()
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    authAdmin,
    authUser
}