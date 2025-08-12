import React from "react";
import { useEffect, useState } from "react";
import api from "../api";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

export default function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/simulate/history");
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  const pieData = [
    { name: "On-Time", value: history.reduce((sum, h) => sum + h.onTimeDeliveries, 0) },
    { name: "Late", value: history.reduce((sum, h) => sum + h.lateDeliveries, 0) }
  ];
  const COLORS = ["#4CAF50", "#FF5252"];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded text-center">
          <p className="font-medium">Total Profit</p>
          <p className="text-green-600 font-bold">
            ₹{history.reduce((sum, h) => sum + h.totalProfit, 0)}
          </p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <p className="font-medium">Efficiency Score</p>
          <p className="text-blue-600 font-bold">
            {history.length > 0
              ? (history.reduce((sum, h) => {
          const scoreNum = parseFloat(h.efficiencyScore); // "92.50%" → 92.5
          return sum + (isNaN(scoreNum) ? 0 : scoreNum);
        }, 0) / history.length
      ).toFixed(2)
              : 0}%
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="mb-4 font-semibold">Profit Over Time</h3>
          <LineChart width={400} height={250} data={history}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="timestamp" hide />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalProfit" stroke="#4CAF50" />
          </LineChart>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="mb-4 font-semibold">On-Time vs Late Deliveries</h3>
          <PieChart width={400} height={250}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
