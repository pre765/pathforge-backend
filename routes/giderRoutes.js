const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  addDomains,
  addCertificates,
  viewRequests,
  acceptRequest,
  rejectRequest,
  viewAcceptedConnections
} = require("../controllers/guiderController");

const { protect } = require("../middleware/authMiddleware");

router.get("/profile", protect, getProfile);
router.put("/update", protect, updateProfile);
router.put("/domains", protect, addDomains);
router.put("/certificates", protect, addCertificates);

router.get("/requests", protect, viewRequests);
router.put("/accept/:id", protect, acceptRequest);
router.put("/reject/:id", protect, rejectRequest);

router.get("/connections", protect, viewAcceptedConnections);

module.exports = router;
