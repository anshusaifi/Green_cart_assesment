import React from "react";
import { useEffect, useState } from "react";
import api from "../api";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({ name: "", shift_hours: "", past_week_hours: "" });

  const fetchDrivers = async () => {
    const res = await api.get("/drivers");
    setDrivers(res.data);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const addDriver = async () => {
    await api.post("/drivers", form);
    setForm({ name: "", shift_hours: "", past_week_hours: "" });
    fetchDrivers();
  };

  const deleteDriver = async (id) => {
    await api.delete(`/drivers/${id}`);
    fetchDrivers();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Drivers</h2>

      {/* Add Driver */}
      <div className="mb-4 flex gap-2">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border px-2 py-1 rounded w-1/3"
        />
        <input
          placeholder="Shift Hours"
          value={form.shift_hours}
          onChange={(e) => setForm({ ...form, shift_hours: e.target.value })}
          className="border px-2 py-1 rounded w-1/3"
        />
        <input
          placeholder="Past Week Hours (| separated)"
          value={form.past_week_hours}
          onChange={(e) => setForm({ ...form, past_week_hours: e.target.value })}
          className="border px-2 py-1 rounded w-1/3"
        />
        <button
          onClick={addDriver}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Add
        </button>
      </div>

      {/* Driver List */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>Shift Hours</th>
            <th>Past Week Hours</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver._id} className="border-t">
              <td className="p-2">{driver.name}</td>
              <td className="p-2">{driver.shift_hours}</td>
              <td className="p-2">{driver.past_week_hours}</td>
              <td className="p-2">
                <button
                  onClick={() => deleteDriver(driver._id)}
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
