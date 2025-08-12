import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Login request
        const res = await api.post("auth/login", {
          email: form.email,
          password: form.password,
        });

        // Expect backend to send: { data: "success", token: "jwt_here" }
        if (res?.data?.data === "success" && res?.data?.token) {
          localStorage.setItem("token", res.data.token); // Store token
          onLogin(); // Update authentication state in App.jsx
          navigate("/dashboard");
        } else {
          alert("Invalid response from server.");
        }

      } else {
        // Signup request
        const res = await api.post("auth/signup", {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        });
        alert("Signup successful");
        console.log(res.data);
      }
    } catch (err) {
      console.error(err);
      alert("Error: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
