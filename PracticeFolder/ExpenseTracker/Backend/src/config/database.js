const mongoose = require("mongoose");

const ConnectToDb = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected To Database");
  });
};

module.exports = ConnectToDb;
