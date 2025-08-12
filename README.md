Project Overview
GreenCart is a complete fleet management and delivery optimization platform designed for logistics companies.
It enables managers to:

Track real-time KPIs like total profit, efficiency score, and on-time delivery rates.

Run simulations with configurable driver availability, start times, and work-hour limits.

Perform CRUD operations for Drivers, Routes, and Orders.

Visualize performance through interactive charts (Chart.js / Recharts).

Authenticate securely with JWT-based login for managers only.

The application is built on the MERN stack (MongoDB, Express.js, React.js, Node.js) and is deployed as:

Frontend: Netlify

Backend: Render

Database: MongoDB Atlas


GreenCart/
│
├── backend/                # Node.js + Express + MongoDB API
│   ├── config/              # Database connection & configuration
│   ├── controllers/         # Business logic & CRUD handlers
│   ├── middleware/          # Auth & error-handling middleware
│   ├── models/              # Mongoose schemas (Drivers, Routes, Orders, Users)
│   ├── routes/              # API endpoints
│   ├── .env.example         # Example backend environment variables
│   └── server.js            # App entry point
│
├── frontend/               # React.js client
│   ├── src/
│   │   ├── components/      # Reusable UI components (Navbar, Charts, Forms)
│   │   ├── pages/           # Dashboard, Simulation, Management pages
│   │   ├── api.js           # Axios API instance
│   │   ├── App.jsx          # Routing and authentication handling
│   │   └── index.js         # React entry point
│   ├── public/
│   └── .env.example         # Example frontend environment variables
│
└── README.md               # Project documentation


Tech Stack
Frontend
React.js (Hooks, React Router)

Axios (HTTP requests)

Tailwind CSS (Responsive UI)

Chart.js / Recharts (Data visualization)

LocalStorage for JWT token storage

Backend
Node.js + Express.js

MongoDB Atlas with Mongoose

JWT (JSON Web Tokens) for authentication

bcrypt.js for password hashing

CORS for cross-origin requests

cookie-parser for token handling

dotenv for environment configuration

Deployment
Frontend: Netlify

Backend: Render

Database: MongoDB Atlas (cloud-hosted)


Dashboard
Displays:

Total Profit

Efficiency Score

On-time vs Late Deliveries chart

Fuel Cost Breakdown chart

2. Simulation Page
Input parameters:

Number of drivers

Route start time

Max hours per driver/day

Backend reallocates orders, applies company rules, returns updated KPIs.

3. Management Pages
Drivers: Add, edit, delete, and view driver info.

Routes: Manage distance, traffic level, base time.

Orders: Assign routes, set timestamps, track delivery status.

4. Authentication
Only managers can log in.

Secure JWT authentication stored in cookies.

Password hashing via bcrypt.

5. Company Rules
Late Delivery Penalty: ₹50 if delivery > base time + 10 mins.

Driver Fatigue: >8 hrs work → 30% slower next day.

High-Value Bonus: Orders > ₹1000 + on time → +10% profit.

Fuel Costs: ₹5/km base, +₹2/km if high traffic.

Overall Profit: Sum of (value + bonus − penalties − fuel).

Efficiency Score: (OnTime Deliveries / Total Deliveries) × 100.

