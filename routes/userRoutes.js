const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  deleteUser,
} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;
