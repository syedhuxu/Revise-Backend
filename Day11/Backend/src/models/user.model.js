// --REQUIREMENTS--
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username alerady exists"],
    required: [true, "username is required"],
  },

  email: {
    type: String,
    unique: [true, "email alerady exists"],
    required: [true, "email is required"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
  },

  bio: String,

  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/huxu198/defaultUser.webp",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
