const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri =process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
};

module.exports = connectDB;
