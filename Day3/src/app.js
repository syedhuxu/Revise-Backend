// Server ko config karna
const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.get("/", (req, res) => {
  res.send(notes);
});

app.post("/notes", (req, res) => {
  console.log(req.body);
  res.send("Note created");

  const { title, description } = req.body;
  notes.push({ title, description });
});

app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];

  res.send("Note deleted successfully");
});

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;
  res.send("Note modified successfully");
});

module.exports = app;
