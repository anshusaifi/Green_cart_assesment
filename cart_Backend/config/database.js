const mongoose = require("mongoose");
const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
 

  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
// ssh -i "TinderSecretKey.pem" ubuntu@ec2-13-201-85-123.ap-south-1.compute.amazonaws.com