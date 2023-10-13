require('dotenv').config();
const mongoose = require('mongoose');

const USERNAME = process.env.DATABASE_USERNAME
const PASSWORD = process.env.DATABASE_PASSWORD

const url = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ru8aeji.mongodb.net/`


mongoose.connect(url).then(()=>{
    console.log('Database is connected successfully...!')
}).catch(()=>{
    console.log(`Database Disconnected..!!`)
});
