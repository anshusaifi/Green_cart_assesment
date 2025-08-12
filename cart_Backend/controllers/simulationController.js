const Driver = require("../models/Driver");
const Route = require("../models/Route");
const Order = require("../models/Order");
const Simulation = require("../models/Simulation");

const runSimulation = async (req, res) => {
  try {
    const { availableDrivers, startTime, maxHoursPerDay } = req.body;

    // ===== Validate input =====
    if (availableDrivers === undefined || startTime === undefined || maxHoursPerDay === undefined) {
      return res.status(400).json({
        message: "Missing required parameters",
        requiredFields: ["availableDrivers (number)", "startTime (HH:MM string)", "maxHoursPerDay (number)"]
      });
    }

    if (typeof availableDrivers !== "number" || typeof maxHoursPerDay !== "number") {
      return res.status(400).json({ message: "availableDrivers and maxHoursPerDay must be numbers" });
    }

    if (typeof startTime !== "string" || !/^\d{2}:\d{2}$/.test(startTime)) {
      return res.status(400).json({ message: "startTime must be in HH:MM format" });
    }

    // ===== Fetch data =====
    let drivers = await Driver.find();
    const routes = await Route.find();
    const orders = await Order.find();

    if (!drivers.length || !routes.length || !orders.length) {
      return res.status(400).json({ message: "No data available to run simulation" });
    }

    let totalProfit = 0;
    let onTimeDeliveries = 0;
    let lateDeliveries = 0;
    let fuelCosts = {};
    let orderAllocations = [];

    // ===== Allocate orders to drivers =====
    let driverIndex = 0;
    orders.forEach(order => {
      const driver = drivers[driverIndex];
      orderAllocations.push({ orderId: order.order_id, driver: driver.name });

      driverIndex = (driverIndex + 1) % availableDrivers;
    });

    // ===== Apply rules =====
    orders.forEach(order => {
      const route = routes.find(r => r.route_id === order.route_id);
      if (!route) return;

      // === Fatigue Rule ===
      const allocatedDriver = orderAllocations.find(o => o.orderId === order.order_id).driver;
      const driverData = drivers.find(d => d.name === allocatedDriver);

      let yesterdayHours;
      if (Array.isArray(driverData.past_week_hours)) {
        yesterdayHours = driverData.past_week_hours.slice(-1)[0];
      } else if (typeof driverData.past_week_hours === "string") {
        yesterdayHours = driverData.past_week_hours.split("|").map(Number).slice(-1)[0];
      } else {
        yesterdayHours = 0;
      }

      let adjustedBaseTime = route.base_time_min;
      if (yesterdayHours > 8) {
        adjustedBaseTime = Math.ceil(adjustedBaseTime * 1.3);
      }

      // === Late delivery check ===
      const [h, m] = order.delivery_time.split(":").map(Number);
      const deliveryMinutes = h * 60 + m;

      let penalty = 0;
      if (deliveryMinutes > adjustedBaseTime + 10) {
        penalty = 50;
        lateDeliveries++;
      } else {
        onTimeDeliveries++;
      }

      // === High-value bonus ===
      let bonus = 0;
      if (order.value_rs > 1000 && penalty === 0) {
        bonus = order.value_rs * 0.1;
      }

      // === Fuel cost ===
      let fuelCost = route.distance_km * 5;
      if (route.traffic_level === "High") fuelCost += route.distance_km * 2;
      fuelCosts[route.route_id] = (fuelCosts[route.route_id] || 0) + fuelCost;

      // === Profit calculation ===
      totalProfit += order.value_rs + bonus - penalty - fuelCost;
    });

    const efficiencyScore = ((onTimeDeliveries / orders.length) * 100).toFixed(2);
    console.log("efficiency score is here >  ",efficiencyScore , typeof(efficiencyScore))

    // ===== Save simulation result =====
    const simulationResult = new Simulation({
      availableDrivers,
      startTime,
      maxHoursPerDay,
      totalProfit,
      efficiencyScore,
      onTimeDeliveries,
      lateDeliveries,
      fuelCosts,
      allocations: orderAllocations,
      timestamp: new Date()
    });

    await simulationResult.save();

    res.json({
      totalProfit,
      efficiencyScore,
      onTimeDeliveries,
      lateDeliveries,
      fuelCosts,
      allocations: orderAllocations
    });

  } catch (error) {
    console.error("Simulation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSimulationHistory = async (req, res) => {
  try {
    const history = await Simulation.find().sort({ timestamp: -1 });
    res.json(history);
  } catch (error) {
    console.error("History fetch error:", error);
    res.status(500).json({ message: "Error fetching simulation history" });
  }
};

module.exports = { runSimulation , getSimulationHistory};
