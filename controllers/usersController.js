const Users = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signUpUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newEmail = await Users.findOne({ email });
        if (newEmail) {
            return res.status(400).json({
                message: 'Email already taken'
            })
        };
        const hash = await bcrypt.hash(password, 10);
        const createUser = new Users({
            name,
            email,
            password: hash
        });
        const genToken = jwt.sign({
            id: createUser._id
        }, process.env.AUT_SEC_ID, { expiresIn: '1d' });
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
}


module.exports = {
    signUpUser
}
