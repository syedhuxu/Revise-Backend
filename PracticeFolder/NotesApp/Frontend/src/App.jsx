import { useState } from "react";

const App = () => {
  const [note, setNote] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="container">
      <form>
        <input type="text" placeholder="Enter Title" />
        <input type="text" placeholder="Enter Description" />
        <button>Create</button>
      </form>

      <div className="notes-container">
        <div className="note">
          <h1>{title}</h1>
          <p>{description}</p>
          <button>Delete</button>
          <button>Update</button>
        </div>
        <div className="updating-form">
          <form>
            <input type="text" placeholder="Enter Updated Title" />
            <input type="text" placeholder="Enter Updated Description" />
            <button>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
