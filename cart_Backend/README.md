*Database**: MongoDB Atlas
- **Authentication**:
  - JWT token-based auth.
  - Password hashing using bcrypt.
- **Data Loading**:
  - Initial data from CSV/JSON for Drivers, Routes, Orders.
- **CRUD Endpoints**:
  - Drivers
  - Routes
  - Orders
- **Simulation Endpoint**:
  - Accepts simulation inputs and applies company rules:
    1. Late Delivery Penalty: ₹50 if late > 10 mins.
    2. Driver Fatigue: speed -30% if >8 hrs previous day.
    3. High-Value Bonus: +10% if value > ₹1000 & on time.
    4. Fuel Costs: ₹5/km + ₹2/km for high traffic.
    5. Profit & Efficiency score calculations.
  - Returns KPIs and stores simulation results in DB.

  - **TECH STACK**
  Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing

**Other:**
- dotenv for environment variables
- CORS for secure API access
