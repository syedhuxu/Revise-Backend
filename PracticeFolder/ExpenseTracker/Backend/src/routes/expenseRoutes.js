const express = require("express");
const expenseRouter = express.Router();
const expenseModel = require("../models/expense.model");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlware/authMiddleware");

expenseRouter.post("/setExpense", authMiddleware, async (req, res) => {
  const { title, amount, category } = req.body;
  const expense = await expenseModel.create({
    title,
    amount,
    category,
    author: req.user.id,
  });

  res.status(201).json({
    message: "Expenses Created",
    expense,
  });
});

expenseRouter.get("/getExpenses", authMiddleware, async (req, res) => {
  const id = req.user.id;
  const expenses = await expenseModel.find({ author: id });

  res.status(200).json({
    message: "Expenses Fetched Successfully",
    expenses,
  });
});

module.exports = expenseRouter;
