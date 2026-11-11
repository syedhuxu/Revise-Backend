import { useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([
    { title: "Test title 1", description: "Test description 1" },
    { title: "Test title 2", description: "Test description 2" },
    { title: "Test title 3", description: "Test description 3" },
    { title: "Test title 4", description: "Test description 4" },
  ]);

  axios.get("http://localhost:3000/api/notes").then((res) => {
    setNotes(res.data.notes);
  });

  return (
    <>
      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
