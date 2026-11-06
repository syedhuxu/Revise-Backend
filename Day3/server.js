// Server ko start karna
const app = require("./src/app");

app.get("/", (req, res) => {
  res.send("Hey!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
