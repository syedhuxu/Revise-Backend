// --REQUIREMENTS--
const postModel = require("../models/post.model");
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const createPostController = async (req, res) => {
  const token = req.cookies.jwt_token;

  if (!token) {
    return res.status(401).json({
      message: "UnAuthorized Access , token required",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "user not authorized",
    });
  }

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "Insta-Revised-2026",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "Post Created...",
    post,
  });
};

const getPostController = async (req, res) => {
  const token = req.cookies.jwt_token;
  if (!token) {
    return res.status(401).json({
      message: "UnAuthorized Access , token required",
    });
  }
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Token invalid",
    });
  }

  const userId = decoded.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "Posts fetched Successfully",
    posts,
  });
};

const getPostDetailsController = async (req, res) => {
  const token = req.cookies.jwt_token;
  if (!token) {
    return res.status(401).json({
      message: "UnAuthorized Access , token required",
    });
  }
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Token invalid",
    });
  }

  const userId = decoded.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post Not Found",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden content",
    });
  }

  return res.status(200).json({
    message: "Post fetched successfully",
    post,
  });
};

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
};
