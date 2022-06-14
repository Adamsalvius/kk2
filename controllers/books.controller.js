const books = require("../models/books.model");

async function getOneBook(req, res) {
  const bookId = req.params.id;

  const fetchedbook = await books.getOneBook(id);

  if (!fetchedbook || !bookId) {
    return res.status(404), res.json({ error: `No book with id:${bookId} was found` });
  }

  res.status(200).json({ message: `Book #${bookId} fetched`, fetchedbook });
}

async function getBooks(req, res) {
  const allBooks = await books.getBooks();

  if (!result) {
    return res.status(400).json({ error: 'No books fetched' });
  }
  if (result.length === 0) {
    return res.status(200).json({ error: 'The library is empty' });
  }
  else{
  res.status(200),
  res.json({ message: 'All current books on display', allBooks });}
}





async function switchBook(req, res) {
  const { title, author, genre } = req.body;

  if (!title) {
    return res.status(400).json({ message: "please fill in the title" });
  }
  if (!author) {
    return res.status(400).json({ message: "please fill in the author" });
  }
  if (!genre) {
    return res.status(400).json({ message: "please fill in the genre" });
  }

  const id = req.params.id;
  const switchBook = {
    title,
    author,
    genre,
  };

  await books.switchBook(id, switchBook);
  res
    .status(200)
    .json({ message: "The book was changed to the new one", updated: req.body });
}

async function modifyBook(req, res) {
  const { title, author, genre } = req.body

  if (!title && !author && !genre) {
    return res
      .status(400)
      .json({ error: "info posts are missing" });
  }

  const id = req.params.id;
  await books.modifyBook(id, title, author, genre);

  res.status(200).json({message: "The book was updated succesfully", updated: req.body });
}
async function addBook(req, res) {
  const { title, author, genre } = req.body;

  if (!title) {
    return res.status(400).send('Please fill in the title');
  }
  if (!author){
    return res.status(400).send('missing author');
  }
  if (!genre) {
    return res.status(400).send('missing genre');
  }
  const createdBook = {title, author, genre};

  await books.addBook(createdBook);

  res.status(201).json({ message: 'Book added to library', createdBook });
}

async function deleteBook(req, res) {
  const id = req.params.id;
  const result = await books.getOneBook(id);
  if (!result) {
    return res
      .status(404)
      .json({ error: `no book with id: ${id} found` });
  }
  await books.deleteBook(id);

  res.status(200).json({ message: `Book deleted` });
}

module.exports = {
  getOneBook,
  getBooks,
  switchBook,
  modifyBook,
  addBook,
  deleteBook,
};