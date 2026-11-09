const mongoose = require("mongoose");
const ConnectToDb = () => {
  mongoose
    .connect(
      "mongodb+srv://Huxu:hbmdHqvD8nevvkuD@cluster0.xda7hnl.mongodb.net/Day-6",
    )
    .then(() => {
      console.log("Connect B Hogya");
    });
};

module.exports = ConnectToDb;
