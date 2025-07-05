const Review = require("../models/Review");

const getReviewsByISBN = async (req, res) => {
  const isbn = req.params.isbn;
  if (!isbn) {
    return res
      .status(400)
      .json({ message: "Book ISBN required to fetch book reviews" });
  }
  try {
    const reviews = Review.findMany({ isbn });
    if (!review) {
      return res
        .status(404)
        .json({ error: "No reviews found under the provided isbn" });
    }
    return res.status(200).json(reviews);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error unable to add review",
      error: err.message,
    });
  }
};

const addReview = async (req, res) => {};
const deleteReview = async (req, res) => {};

module.exports = { getReviewsByISBN, addReview, deleteReview };
