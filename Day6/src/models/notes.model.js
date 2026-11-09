const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const noteModel = mongoose.model("notes", noteSchema);

// Schema is  for format, model  is for performing operations
module.exports = noteModel;
