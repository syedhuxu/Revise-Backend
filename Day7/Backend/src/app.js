const express = require("express");
const cors = require("cors");

const app = express();
const path = require("path");
app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

const noteModel = require("./models/note.model");

// POST /api/notes

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note Created",
    note,
  });
});

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes fetched ",
    notes,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await noteModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "Note deleted",
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  await noteModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    message: "Note Updated..",
  });
});

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
