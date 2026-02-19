const Guider = require("../models/Guider");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await Guider.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Guider already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Guider.create({
    ...req.body,
    password: hashedPassword
  });

  res.json({ message: "Guider registered successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const guider = await Guider.findOne({ email });
  if (!guider) return res.status(400).json({ message: "Guider not found" });

  const isMatch = await bcrypt.compare(password, guider.password);
  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: guider._id },
    process.env.JWT_SECRET
  );

  res.json({ token });
};
