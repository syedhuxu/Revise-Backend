// --REQUIREMENTS--
const express = require("express");
const postController = require("../controllers/post.controller");

const postRouter = express.Router();

// --CREATE-POST API--
postRouter.post("/", postController.createPostController);

module.exports = postRouter;
