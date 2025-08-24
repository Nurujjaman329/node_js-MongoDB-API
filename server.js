const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Auth routes
app.use("/api/auth", require("./routes/auth"));

// Step routes
app.use("/api/steps", require("./routes/step"));

const PORT = process.env.PORT || 5000;

// Listen on all interfaces
app.listen(PORT, '0.0.0.0', () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

