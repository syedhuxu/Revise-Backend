const express = require("express");
const expenseRouter = express.Router();
const expenseModel = require("../models/expense.model");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlware/authMiddleware");

expenseRouter.post("/set", async (req, res) => {
  const { title, amount, category } = req.body;
  const expense = await expenseModel.create({
    title,
    amount,
    category,
    author: req.user._id,
  });

  res.status(201).json({
    message: "Expenses Created",
    expense,
  });
});

module.exports = expenseRouter;
