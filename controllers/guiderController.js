const Guider = require("../models/User");

// CREATE GUIDER
exports.createGuider = async (req, res) => {
  try {
    const guider = await Guider.create(req.body);

    res.status(201).json({
      success: true,
      data: guider
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL GUIDERS
exports.getGuiders = async (req, res) => {
  try {
    const guiders = await Guider.find();

    res.status(200).json({
      success: true,
      data: guiders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
