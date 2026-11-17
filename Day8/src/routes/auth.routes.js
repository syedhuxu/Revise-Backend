const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");

authRouter.post("/register/api", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.create({
    name,
    email,
    password,
  });
});

module.exports = authRouter;
