const express = require("express");
const booksRouter = express.Router();
const booksController = require("../controllers/books.controller");

booksRouter.get("/books/:id", booksController.getOneBook);
booksRouter.get("/books", booksController.getBooks);
booksRouter.put("/books/:id", booksController.switchBook);
booksRouter.patch("/books/:id", booksController.modifyBook);
booksRouter.post("/books", booksController.addBook);
booksRouter.delete("/books/:id", booksController.deleteBook);


module.exports = booksRouter;