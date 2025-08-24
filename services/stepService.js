const Step = require("../models/Step");
const User = require("../models/User");

class StepService {
  async addStep(userId, stepCount) {
    // Add steps for today
    const today = new Date();
    const dateOnly = new Date(today.setHours(0,0,0,0));
    
    let step = await Step.findOne({ user: userId, date: dateOnly });
    if (step) {
      step.stepCount += stepCount; // accumulate
    } else {
      step = new Step({ user: userId, stepCount, date: dateOnly });
    }
    await step.save();
    return step;
  }

  async getUserSteps(userId) {
    return await Step.find({ user: userId }).sort({ date: -1 });
  }

  async getLeaderboard() {
    const today = new Date();
    const dateOnly = new Date(today.setHours(0,0,0,0));

    // Aggregate top 10 users
    const topUsers = await Step.aggregate([
      { $match: { date: dateOnly } },
      { $group: { _id: "$user", stepCount: { $sum: "$stepCount" } } },
      { $sort: { stepCount: -1 } },
      { $limit: 10 },
      { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
      { $unwind: "$user" },
      { $project: { _id: 0, name: "$user.name", email: "$user.email", stepCount: 1 } }
    ]);

    return topUsers;
  }

  async getUserPosition(userId) {
    const today = new Date();
    const dateOnly = new Date(today.setHours(0,0,0,0));

    const steps = await Step.aggregate([
      { $match: { date: dateOnly } },
      { $group: { _id: "$user", stepCount: { $sum: "$stepCount" } } },
      { $sort: { stepCount: -1 } }
    ]);

    const position = steps.findIndex(s => s._id.toString() === userId) + 1;
    return position || null;
  }
}

module.exports = new StepService();
