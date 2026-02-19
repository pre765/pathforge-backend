const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getProfile,
  selectDomain,
  getRoadmapProgress,
  toggleRoadmapItem
} = require("../controllers/studentController");

router.get("/me", protect, getProfile);
router.put("/domain", protect, selectDomain);
router.get("/roadmap-progress", protect, getRoadmapProgress);
router.patch("/roadmap-progress", protect, toggleRoadmapItem);

module.exports = router;
