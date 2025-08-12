import React from "react";
import { useEffect, useState } from "react";
import api from "../api";

export default function RoutesPage() {
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({ distance_km: "", traffic_level: "", base_time_min: "" });

  const fetchRoutes = async () => {
    const res = await api.get("/routes");
    setRoutes(res.data);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const addRoute = async () => {
    await api.post("/routes", form);
    setForm({ distance_km: "", traffic_level: "", base_time_min: "" });
    fetchRoutes();
  };

  const deleteRoute = async (id) => {
    await api.delete(`/routes/${id}`);
    fetchRoutes();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Routes</h2>

      <div className="mb-4 flex gap-2">
        <input
          placeholder="Distance (km)"
          value={form.distance_km}
          onChange={(e) => setForm({ ...form, distance_km: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          placeholder="Traffic Level"
          value={form.traffic_level}
          onChange={(e) => setForm({ ...form, traffic_level: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          placeholder="Base Time (min)"
          value={form.base_time_min}
          onChange={(e) => setForm({ ...form, base_time_min: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={addRoute}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Add
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Distance</th>
            <th>Traffic</th>
            <th>Base Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((r) => (
            <tr key={r._id} className="border-t">
              <td className="p-2">{r.distance_km}</td>
              <td className="p-2">{r.traffic_level}</td>
              <td className="p-2">{r.base_time_min}</td>
              <td className="p-2">
                <button
                  onClick={() => deleteRoute(r._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
