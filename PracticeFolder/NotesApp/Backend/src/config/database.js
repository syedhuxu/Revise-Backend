const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Server is connected to database");
  });
};

module.exports = connectToDb;
