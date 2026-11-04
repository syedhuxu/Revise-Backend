const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/home", (req, res) => {
  res.send("Home page");
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);

  //https://revise-backend-3.onrender.com
});
