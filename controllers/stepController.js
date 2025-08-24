const Step = require("../models/Step"); // ⚠️ Add this
const stepService = require("../services/stepService");

// Add Step
exports.addStep = async (req, res) => {
  try {
    const { stepCount } = req.body;
    if (!stepCount) return res.status(400).json({ msg: "stepCount required" });

    const step = await stepService.addStep(req.user.userId, stepCount);
    res.json({ msg: "Step added", step });
  } catch (err) {
    console.error(err); // 🔹 log error for debugging
    res.status(500).json({ msg: "Server error" });
  }
};

// Get My Steps
exports.getSteps = async (req, res) => {
  try {
    const steps = await Step.find({ user: req.user.userId })
      .populate("user", "name") // populate only name
      .sort({ date: -1 });

    // Map to simpler format
    const simplifiedSteps = steps.map(s => ({
      date: s.date.toISOString().split("T")[0], // YYYY-MM-DD
      stepCount: s.stepCount,
      name: s.user.name
    }));

    res.json({ steps: simplifiedSteps });
  } catch (err) {
    console.error(err); // 🔹 log error for debugging
    res.status(500).json({ msg: "Server error" });
  }
};

// Get Leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const topUsers = await stepService.getLeaderboard();
    const position = await stepService.getUserPosition(req.user.userId);

    res.json({ topUsers, position });
  } catch (err) {
    console.error(err); // 🔹 log error for debugging
    res.status(500).json({ msg: "Server error" });
  }
};
