const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.err(err.message);
    process.exit(1); //Stop server if DB fails
  }
};

module.exports = connectDB;
