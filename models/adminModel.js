const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "This field is required!"]
  },
  email: {
    type: String,
    require: [true, "This field is required!"],
    unique: true
  },
  password: {
    type: String,
    require: [true, "This field is required!"]
  },
  image: {
    type: String
  },
  token: {
    type: String
  },
  subscribers: {
    type: Number
  },
  playlists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "playlists"
  }],
  video: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Videos"
  }],
  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "notifications"
  }]
}, {
  timestamps: true
});

const Admin = mongoose.model("Admins", adminSchema);

module.exports = Admin;