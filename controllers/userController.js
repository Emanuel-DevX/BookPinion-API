const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const User = require("../models/User");

const registerUser = async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
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
      const token = jwt.sign({ userId: user._id, role: user.role }, secret, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (err) {}
};

const deleteUser = async (req, res) => {
  const userIdToDelete = req.params.id;
  const { userId, role } = req.user;

  if (userId !== userIdToDelete && role !== "admin") {
    return res
      .status(403)
      .json({ message: "Unauthorized to delete this user" });
  }

  try {
    console.log(userIdToDelete);
    const user = await User.findById(userIdToDelete);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    await User.findByIdAndDelete(userIdToDelete);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error - unable to delete user",
      error: err.message,
    });
  }
};

module.exports = { registerUser, loginUser, deleteUser };
