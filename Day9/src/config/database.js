const mongoose = require("mongoose");

const connetToDb = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Server Connected To Db");
  });
};

module.exports = connetToDb;
