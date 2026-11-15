const express = require("express");
const noteModel = require("./models/notes.model");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json()); //bhool gya tha
app.use(cors());
app.use(express.static("./public"));

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created",
    note,
  });
});

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  const note = await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note Deleted",
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const updatedNote = await noteModel.findByIdAndUpdate(
    id,
    { title, description },
    { new: true },
  );

  res.status(200).json({
    message: "Note Updated Successfully",
    note: updatedNote,
  });
});

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
