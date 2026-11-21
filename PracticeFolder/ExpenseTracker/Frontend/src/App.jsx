import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");

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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) return;
    try {
      await axios.post("http://localhost:3000/api/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });
      setloginEmail("");
      setloginPassword("");
    } catch (err) {
      console.error("Failed to create note:", err);
    }
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
            <input
              type="email"
              value={loginEmail}
              name="loginEmail"
              onChange={(e) => setloginEmail(e.target.value)}
              placeholder="Enter Your Email"
            />
            <input
              type="password"
              value={loginPassword}
              name="loginPassword"
              onChange={(e) => setloginPassword(e.target.value)}
              placeholder="Enter Your Password"
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default App;
