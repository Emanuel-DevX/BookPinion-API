const Books = require("books.json");
const Review = require("../models/Review");

const getAllBooks = async (req, res) => {};
const getBooksByAuthor = async (req, res) => {};

const getBooksByTitle = async (req, res) => {};

const getBookByISBN = async (req, res) => {};

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
};
