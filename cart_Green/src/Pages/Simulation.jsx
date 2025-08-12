import React from "react";
import { useState } from "react";
import api from "../api";

export default function Simulation() {
  const [form, setForm] = useState({
    availableDrivers: 5,
    startTime: "09:00",
    maxHoursPerDay: 8
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const runSimulation = async () => {
    setLoading(true);
    try {
      const res = await api.post("/simulate", form);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Simulation failed. Please check console for details.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Run Delivery Simulation</h2>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Available Drivers</label>
          <input
            type="number"
            name="availableDrivers"
            value={form.availableDrivers}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium">Start Time (HH:MM)</label>
          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium">Max Hours Per Day</label>
          <input
            type="number"
            name="maxHoursPerDay"
            value={form.maxHoursPerDay}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={runSimulation}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Running..." : "Run Simulation"}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Results</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 shadow rounded">
              <p className="font-medium">Total Profit</p>
              <p className="text-green-600 font-bold">₹{result.totalProfit}</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <p className="font-medium">Efficiency Score</p>
              <p className="text-blue-600 font-bold">{result.efficiencyScore}%</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <p className="font-medium">On-Time Deliveries</p>
              <p className="text-green-600 font-bold">{result.onTimeDeliveries}</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <p className="font-medium">Late Deliveries</p>
              <p className="text-red-600 font-bold">{result.lateDeliveries}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
