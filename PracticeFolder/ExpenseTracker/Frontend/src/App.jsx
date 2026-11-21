import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) return;
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        name,
        email,
        password,
      });
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Failed to create note:", err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
  };

  return (
    <main>
      <div className="registration-container">
        <h1>Register</h1>
        <div className="register-form">
          <form
            onSubmit={(e) => {
              handleRegister(e);
            }}
          >
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
            />
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
            />
            <input
              type="password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
            />
            <button>Create Account</button>
          </form>
        </div>
      </div>
      <div className="loginAccount-container">
        <h1>Login</h1>
        <div className="register-form">
          <form
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
            <input type="email" placeholder="Enter Your Email" />
            <input type="password" placeholder="Enter Your Password" />
            <button>Login</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default App;
