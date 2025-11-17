import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [username, setUsername] = useState("Tejaswini");
  const [password, setPassword] = useState("Tejaswini");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/api/login", { username, password });
      localStorage.setItem("t99_token", res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} aria-label="Login form">
        <div>
          <label htmlFor="username">Username (first name)</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password (first name)</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log in</button>
        {error && <p role="alert">{error}</p>}
      </form>
    </div>
  );
}
