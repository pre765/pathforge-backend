const mongoose = require("mongoose");

const guiderSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  collegeName: String,
  year: String,

  specializedDomains: [String],
  certificates: [String],

  bio: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Guider", guiderSchema);
