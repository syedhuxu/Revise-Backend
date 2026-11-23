const mongoose = require("mongoose");

const connectToDb = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Server Connected To Database");
};

module.exports = connectToDb;
