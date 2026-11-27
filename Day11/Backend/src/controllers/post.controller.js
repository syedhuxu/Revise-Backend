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
    return res.staus(401).json({
      message: "Token required",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  console.log(decoded);

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
  });

  res.send(file);
};

module.exports = {
  createPostController,
};
