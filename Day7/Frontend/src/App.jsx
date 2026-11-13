import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  const fetcheNotes = () => {
    axios.get("https://revise-backend-6.onrender.com/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  };

  const createNotes = (title, description) => {
    axios
      .post("https://revise-backend-6.onrender.com/api/notes", {
        title: title,
        description: description,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  useEffect(() => {
    fetcheNotes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;
    console.log(title.value, description.value);

    createNotes(title.value, description.value);
    fetcheNotes();
  };

  const handleDelete = (id) => {
    axios
      .delete("https://revise-backend-6.onrender.com/api/notes/" + id)
      .then((res) => {
        console.log(res.data);
      });
    fetcheNotes();
  };

  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Enter title" />
        <input name="description" type="text" placeholder="Enter description" />
        <button>Create Note</button>
      </form>
      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button
                onClick={() => {
                  handleDelete(note._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
