import { Link } from "react-router-dom";
import React from "react";

export default function Navbar({ onLogout }) {
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return null; // hide navbar if not logged in
  }

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Left side links */}
      <div className="flex gap-6">
        <Link
          to="/dashboard"
          className="text-white font-semibold hover:text-yellow-400"
        >
          Dashboard
        </Link>
        <Link
          to="/simulation"
          className="text-white font-semibold hover:text-yellow-400"
        >
          Simulation
        </Link>
        <Link
          to="/drivers"
          className="text-white font-semibold hover:text-yellow-400"
        >
          Drivers
        </Link>
        <Link
          to="/routes"
          className="text-white font-semibold hover:text-yellow-400"
        >
          Routes
        </Link>
        <Link
          to="/orders"
          className="text-white font-semibold hover:text-yellow-400"
        >
          Orders
        </Link>
      </div>

      {/* Right side logout button */}
      <button
        onClick={onLogout}
        className="text-white font-semibold hover:text-yellow-400 bg-red-600 px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
}
