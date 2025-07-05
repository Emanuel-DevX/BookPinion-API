const Review = require("../models/Review");

const getReviewsByISBN = async (req, res) => {
  const isbn = req.params.isbn;
  if (!isbn) {
    return res
      .status(400)
      .json({ message: "Book ISBN required to fetch book reviews" });
  }
  try {
    const reviews = await Review.find({ isbn });
    if (!reviews) {
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

const addReview = async (req, res) => {
  const isbn = req.params.isbn;
  const { username } = req.user;
  if (!isbn) {
    return res
      .status(400)
      .json({ error: "Book ISBN required to add a review!" });
  }
  const { comment, rating } = req.body;
  if (!comment || !rating) {
    return res.status(400).json({ message: "Rating and comment are required" });
  }
  const normalizedRating = parseInt(rating);

  if (isNaN(normalizedRating) || normalizedRating < 1 || normalizedRating > 5) {
    return res
      .status(400)
      .json({ message: "Rating must be an integer between 1 and 5" });
  }
  if (await Review.findOne({ isbn: isbn, username: username })) {
    await Review.updateOne(
      { username: username, isbn: isbn },
      {
        comment: comment,
        rating: normalizedRating,
        username: username,
        isbn: isbn,
      }
    );
  } else {
    await Review.create({
      isbn,
      username: username,
      rating: normalizedRating,
      comment,
    });
  }
  return res
    .status(201)
    .json({ message: `Successfully add a review to the book ${isbn}` });
};

const deleteReview = async (req, res) => {
  const isbn = req.params.isbn;
  const { username: targetUser } = req.query;
  const { username: requester, role } = req.user;

  if (role !== "admin" && targetUser && targetUser !== requester) {
    return res
      .status(403)
      .json({ message: "Not allowed to delete others' reviews" });
  }

  if (!isbn) {
    return res
      .status(400)
      .json({ message: "ISBN is required to delete a review" });
  }
  try {
    await Review.deleteOne({ isbn, username: targetUser });
    return res.status(200).json({
      message: `Successfully deleted review for book with isbn${isbn}`,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error - unable to delete a review",
      error: err.message,
    });
  }
};

module.exports = { getReviewsByISBN, addReview, deleteReview };
