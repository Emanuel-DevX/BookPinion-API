const path = require("path");
const fs = require("fs");

const booksPath = path.join(__dirname, "../data/books.json");
const Books = JSON.parse(fs.readFileSync(booksPath, "utf-8")); //Uses sync since the file is static
const Review = require("../models/Review");

const getAllBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedBooks = Books.splice(startIndex, endIndex);
  res.json({
    page,
    totalBooks: Books.length,
    totalPages: Math.ceil(Books.length / limit),
    books: paginatedBooks,
  });
};
const getBooksByAuthor = async (req, res) => {};

const getBooksByTitle = async (req, res) => {};

const getBookByISBN = async (req, res) => {};

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
};
