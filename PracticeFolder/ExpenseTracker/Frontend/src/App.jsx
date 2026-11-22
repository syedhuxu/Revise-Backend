import { useState } from "react";
import axios from "axios";

function App() {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) return;
    try {
      setIsRegisterLoading(true);
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        name,
        email,
        password,
      });
      console.log(res.data);
      setName("");
      setEmail("");
      setPassword("");
      setRegisterError("");
    } catch (err) {
      console.error("Failed to create note:", err);
      setRegisterError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
      setName("");
      setEmail("");
      setPassword("");
    } finally {
      setIsRegisterLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) return;
    try {
      setIsLoginLoading(true);
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });
      console.log(res.data);
      setLoginEmail("");
      setLoginPassword("");
      setLoginError("");
    } catch (err) {
      console.error("Failed to create note:", err);
      setLoginError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
      setLoginEmail("");
      setLoginPassword("");
    } finally {
      setIsLoginLoading(false);
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
            <button type="submit" disabled={isRegisterLoading}>
              {isRegisterLoading ? "Creating Account" : "Create Account"}
            </button>{" "}
            {registerError && (
              <p className="register-error-message">{registerError}</p>
            )}
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
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="Enter Your Email"
            />
            <input
              type="password"
              value={loginPassword}
              name="loginPassword"
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Enter Your Password"
            />
            <button type="submit" disabled={isLoginLoading}>
              {isLoginLoading ? "Logging in..." : "Login"}
            </button>
            {loginError && <p className="login-error-message">{loginError}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}

export default App;
