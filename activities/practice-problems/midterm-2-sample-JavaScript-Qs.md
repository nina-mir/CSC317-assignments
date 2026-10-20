# JavaScript and Node.js Practice Questions

## Questions

### Q1: Create a function that accepts a callback
Write a JavaScript function named `doTask` that takes a callback function as an argument and executes it after logging "Task started".

---

### Q2: Write to a file using the callback notation of Node.js `fs` module
Use the `fs.writeFile` method to write the string `"Hello from Node.js!"` to a file named `hello.txt`. Handle any errors that may occur.

---

### Q3: Read a file using the Promise-based `fs/promises` module
Use the Promise-based version of the `fs` module to read the content of `hello.txt` and print it. Make sure to handle errors.

---

### Q4: Create a chain of promises
Create a chain of promises that:

1. Starts with a number  
2. Adds 10  
3. Multiplies the result by 7  
4. Finds the remainder when divided by 3  

Make sure to catch and log any errors.

---

### Q5: SQLite query for a specific year
Given a table named `films` with a column named `Year`, write a SQL query to select all records where the `Year` is `2025`.

---

### Q6: Implement a `/todo` route in an Express app
Fill in the blanks below to create a basic Express.js route to handle GET requests to `/todo`.

```js
const express = require('express');
const app = express();

// TODO: define your route here
app.____('/todo', (req, res) => {
  // TODO: respond with a sample todo list
  res.json([
    { id: 1, task: 'Learn callbacks', done: false },
    { id: 2, task: 'Understand promises', done: false }
  ]);
});

app.listen(____, () => {
  console.log('Server is running on port ____');
});
```

---

## Answers

### A1: Callback Function
```js
function doTask(callback) {
  console.log("Task started");
  callback();
}

// Example usage:
doTask(() => console.log("Task finished!"));
```
**Hint:** A callback is simply a function passed as an argument and executed later.

---

### A2: Writing to a File with Callback
```js
const fs = require('fs');

fs.writeFile('hello.txt', 'Hello from Node.js!', (err) => {
  if (err) {
    return console.error("Error writing file:", err);
  }
  console.log("File written successfully.");
});
```
**Hint:** Always check for errors inside the callback of file operations.

---

### A3: Reading a File with `fs/promises`
```js
const fs = require('fs/promises');

fs.readFile('hello.txt', 'utf-8')
  .then(data => {
    console.log("File content:", data);
  })
  .catch(err => {
    console.error("Error reading file:", err);
  });
```
**Hint:** Use `.catch()` to handle Promise rejections gracefully.

---

### A4: Chained Promises Example
```js
Promise.resolve(5)
  .then(num => num + 10)        // 15
  .then(num => num * 7)         // 105
  .then(num => num % 3)         // 0
  .then(result => console.log("Final result:", result))
  .catch(err => console.error("Error in chain:", err));
```
**Hint:** Each `.then()` returns a value for the next `.then()` to use.

---

### A5: SQLite Query
```sql
SELECT * FROM films WHERE Year = 2025;
```
**Hint:** Ensure the column name matches your schema exactly (case sensitive).

---

### A6: Express `/todo` Route
```js
const express = require('express');
const app = express();

app.get('/todo', (req, res) => {
  res.json([
    { id: 1, task: 'Learn callbacks', done: false },
    { id: 2, task: 'Understand promises', done: false }
  ]);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
**Hint:** Use `app.get` for a GET route, and `res.json()` to return JSON data.

---
