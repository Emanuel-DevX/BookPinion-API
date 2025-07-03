const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
} = require("../controllers/bookController");

router.get("/", getAllBooks);
router.get("/isbn/:isbn", getBookByISBN);
router.get("/author/:author", getBooksByAuthor);
router.get("/title/:title", getBooksByTitle);

module.exports = router;
