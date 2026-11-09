const express = require("express"); //Server ko create karna

const noteModel = require("./models/notes.model");

const app = express();
app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, description, age } = req.body;

  const note = await noteModel.create({
    title,
    description,
    age,
  });

  res.status(201).json({
    message: "Note Created Successfully",
    note,
  });
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await noteModel.find();
    res.status(200).json({
      message: "Notes Fetched Successfully",
      notes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notes",
      error: error.message,
    });
  }
});

module.exports = app;
