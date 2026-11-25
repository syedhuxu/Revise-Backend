// --REQUIREMENTS--
const postModel = require("../models/post.model");
const jwt = require("jsonwebtoken");

const createPostController = async (req, res) => {
  console.log(req.body);
};

module.exports = {
  createPostController,
};
