const express = require('express')
const connectDB = require("./config/database")
require('dotenv').config();
const cors = require('cors')
const app = express();
const authRoutes = require('./routes/authRoutes');
const driverRoutes = require('./routes/driverRoutes');
const routeRoutes = require('./routes/routeRoutes');
const orderRoutes = require('./routes/orderRoutes');
const simulationRoutes = require("./routes/simulationRoutes")
const cookieParser = require('cookie-parser');
app.use(express.json())


app.use(cors({
  origin: ["http://localhost:5173", "https://greencart12.netlify.app"],
  credentials: true
}));
const PORT = process.env.PORT;
console.log(PORT)
app.use(cookieParser())
console.log("before auth")
app.use("/api/auth",authRoutes)
console.log("after auth")
app.use("/api/drivers", driverRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/simulate", simulationRoutes);
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

try {
    connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect DB:', err);
    process.exit(1);
  }); 
} catch (error) {
    console.log(error)
}
