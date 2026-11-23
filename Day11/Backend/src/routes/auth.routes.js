// --REQUIREMENTS--
const express = require("express");
const userModel = require("../models/user.model");

const authRouter = express.Router();

// --REGISTER AP--
authRouter.post("/register", async (req, res) => {
  const { username, email, password, bio, profileImage } = req.body;

  const isUserExistsByEmail = await userModel.findOne({ email });

  if (isUserExistsByEmail) {
    return res.status(409).json({
      message: "Email Already In Use",
    });
  }
  const isUserExistsByUsername = await userModel.findOne({ username });

  if (isUserExistsByUsername) {
    return res.status(409).json({
      message: "Username Already In Use",
    });
  }
});
