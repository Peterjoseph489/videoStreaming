const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Videos = require('../models/videosModel');


const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newEmail = await Admin.findOne({ email });
        if(newEmail) {
            return res.status(400).json({
                message: 'Email already taken'
            })
        };
        const hash = await bcrypt.hash(password, 10);
        const createUser = new Admin({
            name,
            email,
            password: hash
        });
        const genToken = jwt.sign({
            id: createUser._id
        }, process.env.SESSION_SEC, {expiresIn: '1d'});
        createUser.token = genToken;
        await createUser.save();
        return res.status(201).json({
            data: createUser
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
};


