import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Simulation from "./Pages/Simulation";
import Drivers from "./Pages/Drivers";
import RoutesPage from "./Pages/Routes";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/protectedRoutes";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token on first load
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/simulation"
            element={
              <ProtectedRoute>
                <Simulation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/drivers"
            element={
              <ProtectedRoute>
                <Drivers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/routes"
            element={
              <ProtectedRoute>
                <RoutesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
