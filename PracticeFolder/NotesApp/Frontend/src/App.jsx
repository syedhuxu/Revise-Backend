import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const [editingNoteId, setEditingNoteId] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        "https://revised-notes-app.onrender.com//api/notes",
      );

      const notesList = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.notes)
          ? res.data.notes
          : [];

      setNotes(notesList);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadNotes = async () => {
      try {
        const res = await axios.get(
          "https://revised-notes-app.onrender.com//api/notes",
        );
        const notesList = Array.isArray(res.data)
          ? res.data
          : res.data.notes || [];

        if (isMounted) {
          setNotes(notesList);
        }
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      }
    };

    loadNotes();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    try {
      await axios.post("https://revised-notes-app.onrender.com//api/notes", {
        title,
        description,
      });
      setTitle("");
      setDescription("");
      fetchNotes();
    } catch (err) {
      console.error("Failed to create note:", err);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete("https://revised-notes-app.onrender.com//api/notes/" + id)
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  };

  const startEditing = (note, id) => {
    setEditingNoteId(id);
    setUpdatedTitle(note.title);
    setUpdatedDescription(note.description);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updatedTitle.trim() || !updatedDescription.trim()) return;

    try {
      await axios.patch(
        `https://revised-notes-app.onrender.com//api/notes/${editingNoteId}`,
        {
          title: updatedTitle,
          description: updatedDescription,
        },
      );

      setUpdatedTitle("");
      setUpdatedDescription("");
      setEditingNoteId(null);
      fetchNotes();
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
        />
        <input
          type="text"
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
        />
        <button type="submit">Create</button>
      </form>

      <div className="notes-container">
        {notes.map((note, idx) => {
          const currentId = note._id || note.id || idx;

          return (
            <div key={currentId} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button
                type="button"
                onClick={() => {
                  handleDelete(note._id);
                }}
              >
                Delete
              </button>

              <button
                type="button"
                onClick={() => startEditing(note, currentId)}
              >
                Update
              </button>

              {editingNoteId === currentId && (
                <div className="updating-form">
                  <form onSubmit={handleUpdate}>
                    <input
                      type="text"
                      placeholder="Enter Updated Title"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Enter Updated Description"
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                    />
                    <button type="submit">Save</button>
                    <button
                      type="button"
                      onClick={() => setEditingNoteId(null)}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
