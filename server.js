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
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
