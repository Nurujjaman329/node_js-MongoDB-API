const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const stepController = require("../controllers/stepController");

router.post("/add", authMiddleware, stepController.addStep);
router.get("/my", authMiddleware, stepController.getSteps);
router.get("/leaderboard", authMiddleware, stepController.getLeaderboard);

module.exports = router;
