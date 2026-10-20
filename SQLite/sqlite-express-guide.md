# 🚀 SQLite in Node.js/Express Applications: A Complete Guide

## 📋 Table of Contents
- [Introduction](#introduction)
- [Part 1: Getting Started](#part-1-getting-started)
  - [Installing SQLite](#installing-sqlite)
  - [Establishing a Connection](#establishing-a-connection)
  - [SQLite Query Basics](#sqlite-query-basics)
  - [Creating Your First Database](#creating-your-first-database)
  - [Understanding SQLite Data Types](#understanding-sqlite-data-types)
  - [Creating Tables with Constraints](#creating-tables-with-constraints)
- [Part 2: Database Operations](#part-2-database-operations)
  - [Adding Records (POST)](#adding-records)
  - [Retrieving Records (GET)](#retrieving-records)
  - [Updating Records (PUT/PATCH)](#updating-records)
  - [Deleting Records (DELETE)](#deleting-records)
- [Additional Resources](#additional-resources)

## 📚 Introduction

SQLite is a lightweight, serverless database that's perfect for development and small to medium applications. Unlike other database systems, SQLite doesn't require a separate server process and stores the entire database in a single file on disk. This makes it ideal for web development beginners and applications that need a self-contained solution.

## 🌟 Part 1: Getting Started

### 📦 Installing SQLite

To use SQLite in your Node.js/Express application, you'll need to install the `sqlite3` package:

```bash
npm install sqlite3
```

### 🔌 Establishing a Connection

The `sqlite3` module provides a simple way to connect to an SQLite database:

```javascript
const sqlite3 = require('sqlite3').verbose();

// Open a database connection (creates file if it doesn't exist)
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Close the connection when done (keep this for reference, but don't close until needed)
// db.close((err) => {
//   if (err) {
//     console.error('Error closing database:', err.message);
//   } else {
//     console.log('Database connection closed.');
//   }
// });
```

The `.verbose()` method enables verbose mode which provides more detailed stack traces when errors occur - very helpful during development.

### 📊 SQLite Query Basics

Before we create our database, let's understand how to write and execute common SQLite queries using the `sqlite3` module.

#### Core SQLite3 Methods

The `sqlite3` module provides several methods to execute SQL queries:

1. **`db.run()`**: Executes SQL statements without returning data (INSERT, UPDATE, DELETE, CREATE TABLE, etc.)
2. **`db.get()`**: Retrieves a single row of data
3. **`db.all()`**: Retrieves all rows that match the query
4. **`db.each()`**: Iterates through each row one by one
5. **`db.exec()`**: Executes multiple SQL statements at once (not recommended for user input)
6. **`db.serialize()`**: Ensures that queries run in series rather than in parallel

Let's look at examples of common SQL queries:

#### Basic SELECT Queries

```javascript
// Select all records from a table
db.all("SELECT * FROM colors", [], (err, rows) => {
  if (err) {
    console.error('Error executing query:', err.message);
    return;
  }
  // Process the rows
  console.log('Retrieved rows:', rows);
});

// Select specific columns
db.all("SELECT color_name, hex_code FROM colors", [], (err, rows) => {
  if (err) {
    console.error('Error executing query:', err.message);
    return;
  }
  console.log('Retrieved color names and hex codes:', rows);
});

// Using WHERE clause to filter results
db.all("SELECT * FROM colors WHERE color_name = 'Blue'", [], (err, rows) => {
  if (err) {
    console.error('Error executing query:', err.message);
    return;
  }
  console.log('Blue colors:', rows);
});

// Using parameterized queries (safer for user input)
const colorName = 'Red';
db.all("SELECT * FROM colors WHERE color_name = ?", [colorName], (err, rows) => {
  if (err) {
    console.error('Error executing query:', err.message);
    return;
  }
  console.log('Retrieved colors:', rows);
});
```

#### Using LIKE for Pattern Matching

```javascript
// Find colors whose names contain 'blue'
db.all("SELECT * FROM colors WHERE color_name LIKE '%blue%'", [], (err, rows) => {
  if (err) {
    console.error('Error executing query:', err.message);
    return;
  }
  console.log('Colors containing "blue":', rows);
});
```

#### Aggregation with COUNT, GROUP BY

```javascript
// Count total number of colors
db.get("SELECT COUNT(*) as total FROM colors", [], (err, result) => {
  if (err) {
    console.error('Error executing query:', err.message);
    return;
  }
  console.log('Total colors:', result.total);
});

// Group colors by category and count them
db.all(`
  SELECT category, COUNT(*) as count 
  FROM colors 
  GROUP BY category
`, [], (err, rows) => {
  if (err) {
    console.error('Error executing query:', err.message);
    return;
  }
  console.log('Colors by category:', rows);
});
```

#### Sorting Results with ORDER BY

```javascript
// Get colors sorted alphabetically
db.all("SELECT * FROM colors ORDER BY color_name ASC", [], (err, rows) => {
  if (err) {
    console.error('Error executing query:', err.message);
    return;
  }
  console.log('Colors in alphabetical order:', rows);
});

// Get the 5 most recently added colors
db.all("SELECT * FROM colors ORDER BY id DESC LIMIT 5", [], (err, rows) => {
  if (err) {
    console.error('Error executing query:', err.message);
    return;
  }
  console.log('5 most recent colors:', rows);
});
```

#### Understanding `serialize()` and `parallelize()`

The `db.serialize()` and `db.parallelize()` methods are important for controlling the flow of SQLite operations:

```javascript
// Using serialize() to ensure statements execute in order
db.serialize(() => {
  // These statements will execute in sequence, one after another
  db.run("CREATE TABLE IF NOT EXISTS colors (id INTEGER PRIMARY KEY, color_name TEXT)");
  db.run("INSERT INTO colors (color_name) VALUES (?)", ["Red"]);
  db.run("INSERT INTO colors (color_name) VALUES (?)", ["Blue"]);
  db.all("SELECT * FROM colors", [], (err, rows) => {
    console.log('All colors:', rows);
  });
});
```

The `serialize()` method ensures that all database operations inside its callback function run sequentially in the order they appear in your code. This is crucial when you need one operation to complete before the next one starts (e.g., creating a table before inserting data).

By default, SQLite3 operates in `parallelize` mode, which allows operations to run in parallel when possible:

```javascript
// This is the default mode and doesn't need to be explicitly called
db.parallelize(() => {
  // These may execute in any order
  db.run("INSERT INTO colors (color_name) VALUES (?)", ["Green"]);
  db.run("INSERT INTO colors (color_name) VALUES (?)", ["Yellow"]);
});
```

**When to use each:**
- Use `serialize()` when order matters (creating tables, running migrations, etc.)
- Use the default parallel mode when executing independent operations

### 🎨 Creating Your First Database

Let's create a database with a `colors` table that has three columns:
- color_name (text)
- hex_code (text)
- rgb_value (text)

```javascript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./colors.sqlite');

db.serialize(() => {
  // Create the colors table
  db.run(`
    CREATE TABLE IF NOT EXISTS colors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      color_name TEXT NOT NULL,
      hex_code TEXT NOT NULL,
      rgb_value TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Colors table created successfully.');
      
      // Insert some initial data
      const initialColors = [
        { name: 'Red', hex: '#FF0000', rgb: 'rgb(255,0,0)' },
        { name: 'Green', hex: '#00FF00', rgb: 'rgb(0,255,0)' },
        { name: 'Blue', hex: '#0000FF', rgb: 'rgb(0,0,255)' }
      ];
      
      // Prepare statement for better performance when inserting multiple rows
      const stmt = db.prepare("INSERT INTO colors (color_name, hex_code, rgb_value) VALUES (?, ?, ?)");
      
      initialColors.forEach(color => {
        stmt.run(color.name, color.hex, color.rgb, function(err) {
          if (err) {
            console.error('Error inserting color:', err.message);
          } else {
            console.log(`Inserted color ${color.name} with ID: ${this.lastID}`);
          }
        });
      });
      
      // Finalize the prepared statement when done
      stmt.finalize();
    }
  });
});
```

#### Understanding Prepared Statements

In the example above, we used a prepared statement with `db.prepare()`. This is an important concept in SQLite:

- A prepared statement is a precompiled SQL statement that can be executed multiple times with different parameters.
- They're more efficient when running the same query multiple times with different values.
- They help prevent SQL injection attacks.
- The `finalize()` method must be called when done with the prepared statement to release resources.

### 📊 Understanding SQLite Data Types

SQLite uses a dynamic type system which is different from most other SQL databases. There are only five basic data types:

1. **NULL**: A NULL value.
2. **INTEGER**: A signed integer, stored in 1, 2, 3, 4, 6, or 8 bytes depending on the magnitude of the value.
3. **REAL**: A floating point value, stored as an 8-byte IEEE floating point number.
4. **TEXT**: A text string, stored using the database encoding (UTF-8, UTF-16BE or UTF-16LE).
5. **BLOB**: A blob of data, stored exactly as it was input.

However, SQLite also supports the concept of "type affinity" which means it can store values of different types in any column.

### 🛠 Creating Tables with Constraints

SQLite supports various constraints that help maintain data integrity:

- **NOT NULL**: Ensures a column cannot have a NULL value
- **UNIQUE**: Ensures all values in a column are different
- **PRIMARY KEY**: Uniquely identifies each row in a table
- **FOREIGN KEY**: Links a column to a column in another table
- **CHECK**: Ensures all values in a column satisfy certain conditions
- **DEFAULT**: Provides a default value for a column

Let's create a more sophisticated version of our colors table:

```javascript
db.run(`
  CREATE TABLE IF NOT EXISTS colors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    color_name TEXT NOT NULL UNIQUE,
    hex_code TEXT NOT NULL CHECK(length(hex_code) = 7 AND hex_code LIKE '#%'),
    rgb_value TEXT NOT NULL,
    category TEXT DEFAULT 'uncategorized',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Advanced colors table created successfully.');
  }
});
```

This table includes:
- A unique color name that cannot be null
- A hex code that must start with # and be 7 characters long
- An RGB value that cannot be null
- A category with a default value
- A creation timestamp that defaults to the current time

## 🔄 Part 2: Database Operations

### ➕ Adding Records

In an Express app, you'd typically add records in response to a POST request.

```javascript
const express = require('express');
const app = express();
app.use(express.json());

// Assuming you've already set up your database connection as 'db'

// POST endpoint to add a new color
app.post('/colors', (req, res) => {
  const { color_name, hex_code, rgb_value } = req.body;
  
  // Validate input
  if (!color_name || !hex_code || !rgb_value) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  db.run(
    `INSERT INTO colors (color_name, hex_code, rgb_value) VALUES (?, ?, ?)`,
    [color_name, hex_code, rgb_value],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.status(201).json({
        id: this.lastID,
        message: 'Color added successfully'
      });
    }
  );
});
```

#### Making POST Requests from the Command Line

To test your POST endpoint, you can use the `curl` command from the terminal:

**Windows (PowerShell)**:
```powershell
$headers = @{
    "Content-Type" = "application/json"
}
$body = @{
    color_name = "Crimson"
    hex_code = "#DC143C"
    rgb_value = "rgb(220,20,60)"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/colors" -Method POST -Headers $headers -Body $body
```

**Windows (Command Prompt with curl)**:
```cmd
curl -X POST http://localhost:3000/colors -H "Content-Type: application/json" -d "{\"color_name\":\"Crimson\",\"hex_code\":\"#DC143C\",\"rgb_value\":\"rgb(220,20,60)\"}"
```

**Mac/Linux**:
```bash
curl -X POST http://localhost:3000/colors \
  -H "Content-Type: application/json" \
  -d '{"color_name":"Crimson","hex_code":"#DC143C","rgb_value":"rgb(220,20,60)"}'
```

### 📖 Retrieving Records

Here's how to handle GET requests to retrieve data from your colors table:

```javascript
// GET all colors
app.get('/colors', (req, res) => {
  db.all('SELECT * FROM colors', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET a specific color by ID
app.get('/colors/:id', (req, res) => {
  db.get('SELECT * FROM colors WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Color not found' });
    }
    
    res.json(row);
  });
});
```

#### Making GET Requests from the Command Line

**Windows (PowerShell)**:
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/colors" -Method GET
# For a specific color by ID
Invoke-WebRequest -Uri "http://localhost:3000/colors/1" -Method GET
```

**Windows (Command Prompt)**:
```cmd
curl -X GET http://localhost:3000/colors
# For a specific color by ID
curl -X GET http://localhost:3000/colors/1
```

**Mac/Linux**:
```bash
curl -X GET http://localhost:3000/colors
# For a specific color by ID
curl -X GET http://localhost:3000/colors/1
```

### 🔄 Updating Records

For updates, you'll typically use PUT (replace entire record) or PATCH (partial update):

```javascript
// PUT - Update all fields of a color
app.put('/colors/:id', (req, res) => {
  const { color_name, hex_code, rgb_value } = req.body;
  
  if (!color_name || !hex_code || !rgb_value) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  db.run(
    `UPDATE colors 
     SET color_name = ?, hex_code = ?, rgb_value = ? 
     WHERE id = ?`,
    [color_name, hex_code, rgb_value, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Color not found' });
      }
      
      res.json({ message: 'Color updated successfully' });
    }
  );
});

// PATCH - Update only provided fields
app.patch('/colors/:id', (req, res) => {
  const { color_name, hex_code, rgb_value } = req.body;
  
  // Build dynamic update query
  const updates = [];
  const values = [];
  
  if (color_name) {
    updates.push('color_name = ?');
    values.push(color_name);
  }
  
  if (hex_code) {
    updates.push('hex_code = ?');
    values.push(hex_code);
  }
  
  if (rgb_value) {
    updates.push('rgb_value = ?');
    values.push(rgb_value);
  }
  
  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }
  
  values.push(req.params.id);
  
  db.run(
    `UPDATE colors SET ${updates.join(', ')} WHERE id = ?`,
    values,
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Color not found' });
      }
      
      res.json({ message: 'Color updated successfully' });
    }
  );
});
```

#### Making PUT/PATCH Requests from the Command Line

**Windows (PowerShell)**:
```powershell
# PUT request
$headers = @{
    "Content-Type" = "application/json"
}
$body = @{
    color_name = "Updated Red"
    hex_code = "#FF0000"
    rgb_value = "rgb(255,0,0)"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/colors/1" -Method PUT -Headers $headers -Body $body

# PATCH request (partial update)
$patchBody = @{
    color_name = "New Red Name"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/colors/1" -Method PATCH -Headers $headers -Body $patchBody
```

**Windows (Command Prompt)**:
```cmd
# PUT request
curl -X PUT http://localhost:3000/colors/1 -H "Content-Type: application/json" -d "{\"color_name\":\"Updated Red\",\"hex_code\":\"#FF0000\",\"rgb_value\":\"rgb(255,0,0)\"}"

# PATCH request
curl -X PATCH http://localhost:3000/colors/1 -H "Content-Type: application/json" -d "{\"color_name\":\"New Red Name\"}"
```

**Mac/Linux**:
```bash
# PUT request
curl -X PUT http://localhost:3000/colors/1 \
  -H "Content-Type: application/json" \
  -d '{"color_name":"Updated Red","hex_code":"#FF0000","rgb_value":"rgb(255,0,0)"}'

# PATCH request
curl -X PATCH http://localhost:3000/colors/1 \
  -H "Content-Type: application/json" \
  -d '{"color_name":"New Red Name"}'
```

### 🗑️ Deleting Records

Handle DELETE requests to remove records:

```javascript
// DELETE a color
app.delete('/colors/:id', (req, res) => {
  db.run('DELETE FROM colors WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Color not found' });
    }
    
    res.json({ message: 'Color deleted successfully' });
  });
});
```

#### Making DELETE Requests from the Command Line

**Windows (PowerShell)**:
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/colors/1" -Method DELETE
```

**Windows (Command Prompt)**:
```cmd
curl -X DELETE http://localhost:3000/colors/1
```

**Mac/Linux**:
```bash
curl -X DELETE http://localhost:3000/colors/1
```

## 📚 Putting It All Together

Here's a complete example of an Express application with SQLite integration using callbacks:

```javascript
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());

// Open database connection
const db = new sqlite3.Database('./colors.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Set up the database schema
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS colors (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          color_name TEXT NOT NULL UNIQUE,
          hex_code TEXT NOT NULL CHECK(length(hex_code) = 7 AND hex_code LIKE '#%'),
          rgb_value TEXT NOT NULL,
          category TEXT DEFAULT 'uncategorized',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          console.log('Colors table created or already exists.');
        }
      });
    });
  }
});

// Create a color
app.post('/colors', (req, res) => {
  const { color_name, hex_code, rgb_value, category } = req.body;
  
  if (!color_name || !hex_code || !rgb_value) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  db.run(
    `INSERT INTO colors (color_name, hex_code, rgb_value, category) 
     VALUES (?, ?, ?, ?)`,
    [color_name, hex_code, rgb_value, category || 'uncategorized'],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.status(201).json({
        id: this.lastID,
        message: 'Color added successfully'
      });
    }
  );
});

// Get all colors
app.get('/colors', (req, res) => {
  db.all('SELECT * FROM colors', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get a specific color
app.get('/colors/:id', (req, res) => {
  db.get('SELECT * FROM colors WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Color not found' });
    }
    
    res.json(row);
  });
});

// Update a color
app.put('/colors/:id', (req, res) => {
  const { color_name, hex_code, rgb_value, category } = req.body;
  
  if (!color_name || !hex_code || !rgb_value) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  db.run(
    `UPDATE colors 
     SET color_name = ?, hex_code = ?, rgb_value = ?, category = ? 
     WHERE id = ?`,
    [color_name, hex_code, rgb_value, category || 'uncategorized', req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Color not found' });
      }
      
      res.json({ message: 'Color updated successfully' });
    }
  );
});

// Partially update a color
app.patch('/colors/:id', (req, res) => {
  const { color_name, hex_code, rgb_value, category } = req.body;
  
  // Build dynamic update query
  const updates = [];
  const values = [];
  
  if (color_name) {
    updates.push('color_name = ?');
    values.push(color_name);
  }
  
  if (hex_code) {
    updates.push('hex_code = ?');
    values.push(hex_code);
  }
  
  if (rgb_value) {
    updates.push('rgb_value = ?');
    values.push(rgb_value);
  }
  
  if (category) {
    updates.push('category = ?');
    values.push(category);
  }
  
  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }
  
  values.push(req.params.id);
  
  db.run(
    `UPDATE colors SET ${updates.join(', ')} WHERE id = ?`,
    values,
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Color not found' });
      }
      
      res.json({ message: 'Color updated successfully' });
    }
  );
});

// Delete a color
app.delete('/colors/:id', (req, res) => {
  db.run('DELETE FROM colors WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Color not found' });
    }
    
    res.json({ message: 'Color deleted successfully' });
  });
});

// Sample query endpoints to demonstrate different SQL queries
app.get('/colors/search/:term', (req, res) => {
  const searchTerm = `%${req.params.term}%`;
  
  db.all(
    'SELECT * FROM colors WHERE color_name LIKE ?',
    [searchTerm],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.json(rows);
    }
  );
});

app.get('/colors/count/by-category', (req, res) => {
  db.all(
    'SELECT category, COUNT(*) as count FROM colors GROUP BY category',
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.json(rows);
    }
  );
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle process termination and cleanup
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});
```

## 📚 Additional Resources

- [SQLite Official Documentation](https://www.sqlite.org/docs.html)
- [Node.js sqlite3 Package Documentation](https://github.com/TryGhost/node-sqlite3/wiki/API)
- [SQLite Data Types](https://www.sqlite.org/datatype3.html)
- [SQLite Constraints](https://www.sqlite.org/lang_createtable.html#constraints)
- [Express.js Documentation](https://expressjs.com/)

## 🚀 Best Practices

1. **Use Parameterized Queries**: Always use parameterized queries with `?` placeholders to prevent SQL injection attacks.

2. **Use `serialize()` When Order Matters**: Wrap operations that depend on each other in `db.serialize()` to ensure they execute in order.

3. **Use Prepared Statements for Batch Operations**: When inserting or updating multiple records, use prepared statements for better performance.

4. **Close Connections**: Close database connections when they're no longer needed to prevent resource leaks.

5. **Handle Errors**: Always catch and handle database errors to prevent your application from crashing.

6. **Use Transactions**: For operations that involve multiple queries, use transactions to ensure data integrity:

```javascript
db.serialize(() => {
  db.run("BEGIN TRANSACTION");
  
  db.run("INSERT INTO colors (color_name) VALUES (?)", ["Purple"], function(err) {
    if (err) {
      console.error('Error in transaction:', err.message);
      db.run("ROLLBACK");
      return;
    }
    
    db.run("INSERT INTO color_categories (color_id, category) VALUES (?, ?)", 
      [this.lastID, "primary"], 
      function(err) {
        if (err) {
          console.error('Error in transaction:', err.message);
          db.run("ROLLBACK");
          return;
        }
        
        db.run("COMMIT");
        console.log("Transaction completed successfully");
      }
    );
  });
});
```

7. **Add Indexes**: For better performance, add indexes to columns that are frequently used in WHERE clauses or as JOIN criteria.

8. **Backup Your Database**: Regularly back up your SQLite database file to prevent data loss.

Happy coding! 🎉
