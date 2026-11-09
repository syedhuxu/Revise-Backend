const mongoose = require("mongoose");
const ConnectToDb = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connect B Hogya");
  });
};

module.exports = ConnectToDb;
