const app = require("./src/app");
const mongoose = require("mongoose");

const ConnectToDb = () => {
  mongoose
    .connect(
      "mongodb+srv://Huxu:hbmdHqvD8nevvkuD@cluster0.xda7hnl.mongodb.net/day-5",
    )
    .then(() => {
      console.log("Connected to Database");
    });
};

ConnectToDb();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
