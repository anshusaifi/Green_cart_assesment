const mongoose = require("mongoose");

const simulationSchema = new mongoose.Schema({
  availableDrivers: Number,
  startTime: String,
  maxHoursPerDay: Number,
  totalProfit: Number,
  efficiencyScore: String,
  onTimeDeliveries: Number,
  lateDeliveries: Number,
  fuelCosts: Object,
  allocations: Array,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Simulation", simulationSchema);
