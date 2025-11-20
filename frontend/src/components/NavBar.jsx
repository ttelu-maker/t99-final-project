// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header style={{ padding: "1rem 2rem", borderBottom: "1px solid #ddd" }}>
      <nav aria-label="Main navigation">
        <ul style={{ display: "flex", gap: "1.5rem", listStyle: "none", margin: 0 }}>
          <li><strong>T99 Clean Energy Dashboard</strong></li>
          {token && (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/summary">Summary</Link></li>
              <li><Link to="/reports">Reports</Link></li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
          {!token && (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}
