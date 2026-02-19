let connections = []; // temporary storage

exports.getProfile = (req, res) => {
  res.json({
    message: "Guider profile working",
    guiderId: req.user.id
  });
};

exports.viewRequests = (req, res) => {
  const requests = connections.filter(
    c => c.guiderId === req.user.id && c.status === "pending"
  );
  res.json(requests);
};
