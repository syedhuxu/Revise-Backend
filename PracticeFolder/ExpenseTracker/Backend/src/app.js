const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const authRouter = require("./routes/authRoutes");
const expenseRouter = require("./routes/expenseRoutes");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/expenses", expenseRouter);

module.exports = app;
