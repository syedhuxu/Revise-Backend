const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User Already Exists With This Email Address",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.status(201).json({
    message: "User Created",
    user,
    token,
  });
});

module.exports = authRouter;
