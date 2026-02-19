const Guider = require("../models/Guider");
const Connection = require("../models/Connection");

exports.getProfile = async (req, res) => {
  const guider = await Guider.findById(req.user.id);
  res.json(guider);
};

exports.updateProfile = async (req, res) => {
  const guider = await Guider.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  );
  res.json(guider);
};

exports.addDomains = async (req, res) => {
  const { specializedDomains } = req.body;

  const guider = await Guider.findByIdAndUpdate(
    req.user.id,
    { specializedDomains },
    { new: true }
  );

  res.json(guider);
};

exports.addCertificates = async (req, res) => {
  const { certificates } = req.body;

  const guider = await Guider.findByIdAndUpdate(
    req.user.id,
    { certificates },
    { new: true }
  );

  res.json(guider);
};

exports.viewRequests = async (req, res) => {
  const requests = await Connection.find({
    guider: req.user.id,
    status: "pending"
  });

  res.json(requests);
};

exports.acceptRequest = async (req, res) => {
  const connection = await Connection.findByIdAndUpdate(
    req.params.id,
    { status: "accepted" },
    { new: true }
  );

  res.json(connection);
};

exports.rejectRequest = async (req, res) => {
  const connection = await Connection.findByIdAndUpdate(
    req.params.id,
    { status: "rejected" },
    { new: true }
  );

  res.json(connection);
};

exports.viewAcceptedConnections = async (req, res) => {
  const connections = await Connection.find({
    guider: req.user.id,
    status: "accepted"
  });

  res.json(connections);
};
