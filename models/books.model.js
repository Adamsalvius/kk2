const res = require("express/lib/response");
const db = require("../config/db");

function getBooks() {
  const sql = "SELECT * FROM books";

  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function getOneBook(id) {
  const sql = "SELECT * FROM books WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, id, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
      res.status(200)
    });
  });
}

function addBook(book) {
  const sql = "INSERT INTO books (title, author, genre) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.run(sql, [book.title, book.author, book.genre], (err) => {
      if (err) {
        console.error(err.message);
        res.status(404);
        reject(err);
      }
      resolve();
      res.status(201)
    });
  });
}

function changeBook(id, book) {
  const sql = `UPDATE books SET title = '${book.title}', author = '${book.author}', genre = '${book.genre}' WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) {
        console.error(err.message);
        res.status(400);
        reject(err);
      }
      resolve();
      res.status(201)
    });
  });
}

function modifyBook(id, title, author, genre) {
  const sql = `UPDATE books SET title = COALESCE(?,title),author = COALESCE(?,author), genre = COALESCE(?,genre) WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.run(sql, [title, author, genre, id], function (err) {
      if (err) {
        console.error(err.message);
        res.status(400);
        reject(err);
      }
      resolve();
      res.status(200)
    });
  });
}

function deleteBook(id) {
  const sql = "DELETE FROM books WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, id, (error) => {
      if (error) {
        
        res.status(400);
        console.error(error.message);
        reject(error);
      }
      resolve();
      /* res.status(200) */
    });
  });
}

module.exports = {
  getOneBook,
  getBooks,
  addBook,
  changeBook,
  modifyBook,
  deleteBook,
};