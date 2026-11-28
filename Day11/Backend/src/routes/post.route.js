// --REQUIREMENTS--
const express = require("express");
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

// --CREATE-POST API--
postRouter.post(
  "/",
  upload.single("image"),
  postController.createPostController,
);

// --GET-POST API--
postRouter.get("/", postController.getPostController);

// --POST-DETAILS API--

postRouter.get("/details/:postId", postController.getPostDetailsController);

module.exports = postRouter;
