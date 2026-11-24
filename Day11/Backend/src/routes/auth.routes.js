// --REQUIREMENTS--
const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

// --REGISTER API--
authRouter.post("/register", authController.registerController);

// --LOGIN API--
authRouter.post("/login", authController.loginController);

module.exports = authRouter;
