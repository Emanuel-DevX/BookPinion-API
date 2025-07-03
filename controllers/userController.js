const bcrypt = require("bcrypt");

const User = require("../models/User");

const registerUser = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });
    return res
      .status(201)
      .send(`User sucessfully registered with username: ${user.username}`);
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Incorrect username" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res
        .status(200)
        .send(`sucessfully logged in with username: ${username}`);
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (err) {}
};

module.exports = { registerUser, loginUser };
