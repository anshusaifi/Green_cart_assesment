const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const dotenv = require("dotenv");

dotenv.config();

// Import your models
const Driver = require("./models/Driver");
const Route = require("./models/Route");
const Order = require("./models/Order");

// Function to read CSV file and return an array of objects
const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Clear old data
    await Driver.deleteMany();
    await Route.deleteMany();
    await Order.deleteMany();

    // Read and insert Drivers
    const driversData = await readCSV(path.join(__dirname, "data", "drivers.csv"));
    const drivers = driversData.map(d => ({
      name: d.name,
      shift_hours: Number(d.shift_hours),
      past_week_hours: d.past_week_hours.split("|").map(Number)
    }));
    await Driver.insertMany(drivers);
    console.log("Drivers seeded");

    // Read and insert Routes
    const routesData = await readCSV(path.join(__dirname, "data", "routes.csv"));
    const routes = routesData.map(r => ({
      route_id: Number(r.route_id),
      distance_km: Number(r.distance_km),
      traffic_level: r.traffic_level,
      base_time_min: Number(r.base_time_min)
    }));
    await Route.insertMany(routes);
    console.log("✅ Routes seeded");

    // Read and insert Orders
    const ordersData = await readCSV(path.join(__dirname, "data", "orders.csv"));
    const orders = ordersData.map(o => ({
      order_id: Number(o.order_id),
      value_rs: Number(o.value_rs),
      route_id: Number(o.route_id),
      delivery_time: o.delivery_time
    }));
    await Order.insertMany(orders);
    console.log("Orders seeded");

    mongoose.connection.close();
    console.log(" Seeding completed");
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
