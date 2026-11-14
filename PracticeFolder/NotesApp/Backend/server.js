require("dotenv").config(); // bhool gya tha

const app = require("./src/app");
const connected = require("./src/config/database");

connected();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
