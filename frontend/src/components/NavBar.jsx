import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("t99_token");
    navigate("/login");
  };

  return (
    <header>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <nav aria-label="Main navigation">
        <h1>T99 Clean Energy Dashboard</h1>
        <ul>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/summary">Summary</NavLink></li>
          <li><NavLink to="/reports">Reports</NavLink></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
}
