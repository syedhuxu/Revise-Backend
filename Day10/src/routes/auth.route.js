const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

const userModel = require("../models/user.model");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(409).json({
      message: "Email Already IN Use",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

module.exports = authRouter;
