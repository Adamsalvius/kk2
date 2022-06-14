const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
  console.log("The server is running, welcome to the library");

  
  const statement = 
  `CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    genre TEXT)`;

  
    db.run(statement, (error) => {
    if (error) {
      console.error(error.message);
      throw error;
    }
    const add = `INSERT INTO books (title, author, genre)
      VALUES (?, ?, ?)`;

    db.run(add, ["The yellow King", "forfater", "horror"]),
      db.run(add, ["livsråd", "Di döda Tomas", "self-help"]),
      db.run(add, ["köttets lustfyllda piroger", "Morberg Per", "matlagning"]),
      db.run(add, ["Torsk på polska", "Roberto Paolo", "self-help"]),
      (error) => {
        if (error) {
          console.error(error);
        }
      };
  });
});
module.exports = db;