const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const authRouter = require("./routes/authRoutes");
const expenseRouter = require("./routes/expenseRoutes");

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/expenses", expenseRouter);

module.exports = app;
