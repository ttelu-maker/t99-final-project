import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Summary from "./pages/Summary.jsx";
import Reports from "./pages/Reports.jsx";
import NavBar from "./components/NavBar.jsx";

function isAuthenticated() {
  return !!localStorage.getItem("t99_token");
}

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const loggedIn = isAuthenticated();

  return (
    <div className="app">
      {loggedIn && <NavBar />}
      <main id="main-content">
        <Routes>
          <Route
            path="/login"
            element={loggedIn ? <Navigate to="/dashboard" replace /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/summary"
            element={
              <ProtectedRoute>
                <Summary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}
