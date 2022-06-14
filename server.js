


const express = require("express");
const app = express();

const PORT = 4000;
const booksRouter = require("./routers/books.router.js");

app.use(express.json());

app.use(booksRouter);

app.listen(PORT, () => {
  console.log(`Servern kör på port: ${PORT}.`);
});