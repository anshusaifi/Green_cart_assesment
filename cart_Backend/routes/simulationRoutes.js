const express = require("express");
const { runSimulation , getSimulationHistory} = require("../controllers/simulationController");

const router = express.Router();

router.post("/", runSimulation);
router.get("/history", getSimulationHistory);

module.exports = router;
