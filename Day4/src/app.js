const express = require("express");

const app = express();

app.use(express.json());
const notes = [];

//POST /notes
app.post("/notes", (req, res) => {
  console.log(req.body);

  notes.push(req.body);

  res.status(201).json({
    message: " NOte Created Successfully",
  });
});

//GET /notes
app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "Notes Fetched Successfully",
    notes,
  });
});

module.exports = app;
