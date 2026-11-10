const mongoose = require("mongoose");
// pehle schema bnao and then model bna k export kardo...
const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const noteModel = mongoose.model("notes", noteSchema); //notes ek collection hai

module.exports = noteModel;
