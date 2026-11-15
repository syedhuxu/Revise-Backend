import { useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
    console.log(description);
  };

  const createNotes = (title, description) => {
    axios
      .post("http://localhost:3000/api/notes", {
        title: title,
        description: description,
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  const fetchNotes = () => {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      console.log(res.data);
      setNotes(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;
    console.log(title.value, description.value);

    createNotes(title.value, description.value);
    fetchNotes();
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {}
        <input
          type="text"
          value={title}
          name="title"
          onChange={handleTitle}
          placeholder="Enter Title"
        />

        {}
        <input
          type="text"
          value={description}
          name="description"
          onChange={handleDescription}
          placeholder="Enter Description"
        />
        <button>Create</button>
      </form>

      <div className="notes-container">
        {notes.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button>Delete</button>
              <button>Update</button>

              <div className="updating-form">
                <form>
                  <input type="text" placeholder="Enter Updated Title" />
                  <input type="text" placeholder="Enter Updated Description" />
                  <button>Update</button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
