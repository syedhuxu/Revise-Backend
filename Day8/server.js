require("dotenv").config();
const app = require("./src/app");

const connetToDb = require("./src/config/database");
connetToDb();

app.listen(3000, () => {
  console.log("Server Is Running On Port 3000");
});
