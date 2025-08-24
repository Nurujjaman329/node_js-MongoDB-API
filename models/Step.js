const mongoose = require("mongoose");

const StepSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: () => new Date().setHours(0, 0, 0, 0) },
  stepCount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Step", StepSchema);
