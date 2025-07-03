const path = require("path");
const fs = require("fs");

const booksPath = path.join(__dirname, "../data/books.json");
const Books = JSON.parse(fs.readFileSync(booksPath, "utf-8")); //Uses sync since the file is static

const getAllBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedBooks = Books.slice(startIndex, endIndex);
  res.json({
    page,
    totalBooks: Books.length,
    totalPages: Math.ceil(Books.length / limit),
    books: paginatedBooks,
  });
};
const getBooksByAuthor = async (req, res) => {
  const author = req.params.author;
  if (!author) {
    return res.status(400).json({ message: "Author name required" });
  }

  const normalizedInput = author.trim().toLowerCase();

  const booksByAuthor = Books.filter((book) =>
    book.authors?.some((a) => a.toLowerCase().includes(normalizedInput))
  );
  res.status(200).json(booksByAuthor);
};

const getBooksByTitle = async (req, res) => {
  const title = req.params.title;
  if (!title) {
    return res.status(400).json({ message: "Book Title required" });
  }
  const normalizedInput = title.trim().toLowerCase();
  const booksWithTitle = Books.filter((book) => {
    return book.title.toLowerCase().includes(normalizedInput);
  });
  return res.status(200).json(booksWithTitle);
};

const getBookByISBN = async (req, res) => {};

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
};
