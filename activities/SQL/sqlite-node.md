# SQLite in Node.js: A Simple Introduction

This guide will walk you through:
1. Installing SQLite (via the `sqlite3` library) in a Node.js project.
2. Creating a database with Node.js.
3. Creating a table.
4. Populating the table with data.
5. Running queries on the table.

We’ll use a simple **animals** example, where we store data on animals’ life expectancy, habitat, and whether they’re in danger. Whenever we encounter a specific SQLite or `sqlite3` method or keyword, we’ll briefly explain it.

---

## 1. Installing SQLite (`sqlite3` Library)
To install SQLite in a Node.js project, we use the [`sqlite3` package](https://www.npmjs.com/package/sqlite3). Run this command in your project folder:

```bash
npm install sqlite3
```

**Why `sqlite3`?**  
- `sqlite3` is a Node.js library that lets us create and interact with SQLite databases directly from our Node.js applications.  
- SQLite is a self-contained, file-based database; no separate server is needed.

---

## 2. Creating a Database via Node.js
Let's create and open a database file called `animals.db`:

```js
const sqlite3 = require("sqlite3").verbose();

// Create or open the 'animals.db' database.
const db = new sqlite3.Database("animals.db", (err) => {
  if (err) {
    return console.error("Error opening database:", err.message);
  }
  console.log("Connected to the animals database.");
});
```

**What does `require("sqlite3").verbose()` do?**  
- When we `require("sqlite3")`, we load the SQLite library in Node.  
- `.verbose()` makes the library log additional information to the console, which can help debug.

**What does `new sqlite3.Database("animals.db", callback)` do?**  
- It either creates a new database file named `animals.db` if it doesn’t exist, or opens it if it already exists.  
- We also provide a callback to handle any error and confirm a successful connection.

---

## 3. Creating a Table

We’ll create a table named `Animals` with the following columns:
- `id` (INTEGER, primary key, auto-incremented)
- `name` (TEXT)
- `habitat` (TEXT)
- `life_expectancy` (INTEGER)
- `in_danger` (INTEGER representing a boolean: 0 means false, 1 means true)

```js
db.run(`
  CREATE TABLE IF NOT EXISTS Animals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    habitat TEXT NOT NULL,
    life_expectancy INTEGER,
    in_danger INTEGER
  )
`, (err) => {
  if (err) {
    return console.error("Error creating table:", err.message);
  }
  console.log("Animals table created (if it didn't already exist).");
});
```

**What does `db.run()` do?**  
- `db.run()` executes a SQL statement such as `CREATE TABLE`.  
- In this case, we check `IF NOT EXISTS` so that if the table already exists, it won’t be recreated or overwritten.

**Key Points:**
- `PRIMARY KEY AUTOINCREMENT` automatically gives each entry a unique numeric ID.
- `TEXT NOT NULL` means the column stores text and cannot be left empty (NULL).
- `INTEGER` means a numeric value; storing an integer helps if we want to do numeric operations (e.g., filter life expectancy by greater/less than).

---

## 4. Populating the Table

We’ll insert a few animals into our `Animals` table:

```js
const insertQuery = `
  INSERT INTO Animals (name, habitat, life_expectancy, in_danger)
  VALUES (?, ?, ?, ?)
`;

db.run(insertQuery, ["Elephant", "Savannah", 60, 1], function(err) {
  if (err) {
    return console.error("Error inserting Elephant:", err.message);
  }
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});

db.run(insertQuery, ["Turtle", "Ocean", 100, 0], function(err) {
  if (err) {
    return console.error("Error inserting Turtle:", err.message);
  }
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});

db.run(insertQuery, ["Dog", "Domestic", 13, 0], function(err) {
  if (err) {
    return console.error("Error inserting Dog:", err.message);
  }
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});
```

**What does `INSERT INTO` do?**  
- `INSERT INTO table (columns...) VALUES (...)` is the SQL statement to insert new rows into your table.

**What does `(?, ?, ?, ?)` mean?**  
- These are placeholders (parameters) for values that we pass in separately to help prevent SQL injection attacks.  
- They also make queries cleaner and more maintainable.

**What is `db.run(query, values, callback)`?**  
- This runs an `INSERT` (or other non-query statement) with given parameters (`values`) and a callback to handle success or error.

**What is `this.lastID`?**  
- Within the callback, `this.lastID` gives us the ID of the last inserted row.  

---

## 5. Running Queries

### 5.1 Selecting Data
Now let’s run a simple `SELECT` query to view all animals in the table:

```js
db.all("SELECT * FROM Animals", (err, rows) => {
  if (err) {
    return console.error("Error fetching data:", err.message);
  }
  console.log("All Animals:", rows);
});
```

**What does `db.all()` do?**  
- `db.all()` executes a SQL query and fetches **all** resulting rows.  
- The callback gives us an array of rows (`rows`).

### 5.2 Selecting with Conditions
Let’s find animals that live longer than 50 years:

```js
db.all("SELECT * FROM Animals WHERE life_expectancy > ?", [50], (err, rows) => {
  if (err) {
    return console.error("Error fetching data:", err.message);
  }
  console.log("Animals with life expectancy over 50 years:", rows);
});
```

### 5.3 Updating Data
If we want to mark the “Dog” record as in danger, we can update it:

```js
db.run("UPDATE Animals SET in_danger = ? WHERE name = ?", [1, "Dog"], function(err) {
  if (err) {
    return console.error("Error updating data:", err.message);
  }
  console.log(`Rows updated: ${this.changes}`);
});
```

**What does `db.run(query, params, callback)` do here?**  
- It executes an `UPDATE` statement.  
- `this.changes` tells us how many rows were changed.

### 5.4 Deleting Data
To remove the “Dog” record:

```js
db.run("DELETE FROM Animals WHERE name = ?", ["Dog"], function(err) {
  if (err) {
    return console.error("Error deleting data:", err.message);
  }
  console.log(`Rows deleted: ${this.changes}`);
});
```

**What does `DELETE FROM` do?**  
- `DELETE FROM table WHERE condition` removes rows that match the given condition.

---

## 6. Closing the Database Connection

When you’re done with all queries, it’s a good practice to close the connection:

```js
db.close((err) => {
  if (err) {
    return console.error("Error closing the database:", err.message);
  }
  console.log("Database connection closed.");
});
```

**What does `db.close()` do?**  
- Closes the connection to the database, freeing resources.

---

# Summary

- **Install** `sqlite3` via `npm install sqlite3`.
- **Create/Open** a database with `new sqlite3.Database("filename.db")`.
- **Create a table** with `db.run("CREATE TABLE IF NOT EXISTS...")`.
- **Insert data** with an `INSERT INTO` statement.
- **Run queries** (SELECT, UPDATE, DELETE) using `db.run()` or `db.all()`.

With these steps, you’ve set up a basic Node.js application that uses SQLite to store and query data. Our animal examples demonstrated how to **create** a table, **insert** data, **select** and **filter** rows, **update** records, and **delete** data. Always remember to handle errors gracefully and close your database connection when you’re done.