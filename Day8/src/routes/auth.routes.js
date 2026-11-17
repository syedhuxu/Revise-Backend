const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userModel.create({
    name,
    email,
    password,
  });
  res.status(201).json({
    message: "User Created",
    user,
  });
});

module.exports = authRouter;
