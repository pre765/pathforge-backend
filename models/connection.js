const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
  studentName: String,   // just basic info for now
  studentEmail: String,

  guider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guider"
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Connection", connectionSchema);
