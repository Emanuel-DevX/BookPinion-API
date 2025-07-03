const User = require("../models/User");

const registerUser = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });
  } catch (error) {}
};

module.exports = { registerUser };
