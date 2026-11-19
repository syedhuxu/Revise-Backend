const express = require("express");

const app = express();
app.use(express.json());

const authRouter = require("./routes/authRoutes");
app.use("/api/auth", authRouter);

const expenseRouter = require("./routes/expenseRoutes");
app.use("/api/expense", expenseRouter);

module.exports = app;
