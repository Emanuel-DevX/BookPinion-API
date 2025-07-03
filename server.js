const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");

connectDB();

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`All good surver is running on port: ${PORT}`);
});
