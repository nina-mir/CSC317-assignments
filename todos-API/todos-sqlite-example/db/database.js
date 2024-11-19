const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or connect to the database
const db = new sqlite3.Database(path.join(__dirname, 'todos.db'), (err) => {
  if (err) {
    console.error('Failed to connect to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create the todos table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0
    )
  `);
});

module.exports = db;
