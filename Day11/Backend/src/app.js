// --REQUIREMENTS--
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// --MIDDLEWARE--
app.use(express.json());
app.use(cookieParser());

module.exports = app;
