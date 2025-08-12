import React from "react";
import { useEffect, useState } from "react";
import api from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ value_rs: "", route_id: "", delivery_time: "" });

  const fetchOrders = async () => {
    const res = await api.get("/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const addOrder = async () => {
    await api.post("/orders", form);
    setForm({ value_rs: "", route_id: "", delivery_time: "" });
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    await api.delete(`/orders/${id}`);
    fetchOrders();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      <div className="mb-4 flex gap-2">
        <input
          placeholder="Value (₹)"
          value={form.value_rs}
          onChange={(e) => setForm({ ...form, value_rs: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          placeholder="Route ID"
          value={form.route_id}
          onChange={(e) => setForm({ ...form, route_id: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          placeholder="Delivery Time (HH:MM)"
          value={form.delivery_time}
          onChange={(e) => setForm({ ...form, delivery_time: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={addOrder}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Add
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Value</th>
            <th>Route ID</th>
            <th>Delivery Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-t">
              <td className="p-2">{o.value_rs}</td>
              <td className="p-2">{o.route_id}</td>
              <td className="p-2">{o.delivery_time}</td>
              <td className="p-2">
                <button
                  onClick={() => deleteOrder(o._id)}
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
