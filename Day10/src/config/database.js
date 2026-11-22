const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Server Connected To Database");
  });
};

module.exports = connectToDb;
