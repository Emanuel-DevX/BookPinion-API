const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const healthcheck = require("./routes/health");

connectDB();
const app = express();
app.use("/", express.static("public"));

app.use(express.json());

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/reviews", reviewRoutes);
app.use("/healthcheck", healthcheck);


app.listen(PORT, () => {
  console.log(`All good surver is running on port: ${PORT}`);
});
