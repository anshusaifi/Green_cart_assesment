import axios from "axios";

const api = axios.create({
  baseURL: "https://green-cart-backend-f25o.onrender.com/api", // Change to your backend URL in production
  withCredentials: true, // send cookies (JWT token in cookie)
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
