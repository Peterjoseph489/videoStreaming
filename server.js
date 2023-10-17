require('./configDB/configDB.js');
require('dotenv').config();
const express = require('express');
const http = require("http")
const PORT = process.env.PORT || 1122
const expressSession = require('express-session');
const fileUpload = require('express-fileupload');


const app = express();
app.use(express.json());
app.use(expressSession({
    key: 'user_id',
    resave: true,
    secret: 'process.env.SESSION_SEC',
    saveUninitialized: true
}));

app.use(fileUpload({
    useTempFiles: true
}));

const Server = http.createServer(app)
Server.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});
// app.listen(PORT, ()=>{
//     console.log('This Server is running on Port: '+PORT)
// });
