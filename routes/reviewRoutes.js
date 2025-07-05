const express = require("express");

const protect = require("../middlewares/authMiddleware");
const {
  getReviewsByISBN,
  addReview,
  deleteReview,
} = require("../controllers/reviewController");

const router = express.Router();

router.get("/:isbn", getReviewsByISBN);
router.post("/:isbn", protect, addReview);
router.delete("/:isbn", protect, deleteReview);
