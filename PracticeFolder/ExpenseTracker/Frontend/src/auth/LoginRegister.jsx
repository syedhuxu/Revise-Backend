import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginRegister() {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isRegisterLoading) return;
    if (!name.trim() || !email.trim() || !password.trim()) {
      setRegisterError("Please fill in all fields.");
      return;
    }
    setRegisterError("");

    try {
      setIsRegisterLoading(true);
      const res = await api.post("/auth/register", { name, email, password });
      console.log(res.data);
      setName("");
      setEmail("");
      setPassword("");
      setRegisterError("");
      login(res.data);
      navigate("/home");
    } catch (err) {
      console.error("Failed to register", err);
      setRegisterError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsRegisterLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoginLoading) return;

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError("Please fill in all fields.");
      return;
    }

    setLoginError("");
    try {
      setIsLoginLoading(true);
      const res = await api.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      console.log(res.data);
      setLoginEmail("");
      setLoginPassword("");
      setLoginError("");
      login(res.data);
      navigate("/home");
    } catch (err) {
      console.error("Failed to login", err);

      setLoginError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoginLoading(false);
    }
  };

  return (
    <main>
      <div className="registration-container">
        <h1>Register</h1>
        <div className="register-form">
          <form onSubmit={handleRegister}>
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
        <div className="login-form">
          <form onSubmit={handleLogin}>
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

export default LoginRegister;
