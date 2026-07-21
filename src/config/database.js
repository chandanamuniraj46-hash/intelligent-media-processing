const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection failed:", err.message);
  }
};

module.exports = connectDB;
