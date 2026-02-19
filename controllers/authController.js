const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let guiders = []; // temporary storage

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = guiders.find(g => g.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Guider already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newGuider = {
    id: Date.now().toString(),
    ...req.body,
    password: hashedPassword
  };

  guiders.push(newGuider);

  res.json({ message: "Guider registered successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const guider = guiders.find(g => g.email === email);
  if (!guider) {
    return res.status(400).json({ message: "Guider not found" });
  }

  const isMatch = await bcrypt.compare(password, guider.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: guider.id },
    "mysecretkey"
  );

  res.json({ token });
};
