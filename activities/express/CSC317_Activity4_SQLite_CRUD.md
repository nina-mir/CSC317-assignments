# CSC 317 — Activity 4: Saving Data with SQLite (CRUD Basics)

## Learning Objectives
By the end of this activity, you will be able to:
1. Explain what a database, table, row, and column are
2. Use the SQLite shell to create a table and run basic SQL commands
3. Perform **CRUD** operations (Create, Read, Update, Delete) with SQL
4. Connect a Node.js project to a SQLite database
5. Organize database code into its own files

## Before You Start
- [ ] Node.js is installed (`node -v`)
- [ ] The SQLite shell is installed. Check it with `sqlite3 --version`
  - **Mac:** already installed
  - **Windows:** go to [sqlite.org/download.html](https://sqlite.org/download.html), download the **sqlite-tools-win-x64** zip, unzip it, and run `sqlite3.exe` from that folder
  - **Linux:** `sudo apt install sqlite3`

📝 **Record your version:** SQLite `________`

💡 **Big idea:** In Activity 3, every guestbook entry **disappeared** when the server restarted, because the data lived in memory. A **database** saves data in a file on disk, so it's still there after a restart, a reboot, or next week.

**Why SQLite?** It's a complete database stored in **one file**. There's no separate server to install or start, which makes it great for learning. The SQL you learn here works (with small changes) in MySQL, PostgreSQL, and other databases.

---

## Part 1 — Database Vocabulary (5 min)

Think of a database like a spreadsheet:

| Term | Spreadsheet version | Example |
|---|---|---|
| **Database** | The whole file | `app.db` |
| **Table** | One sheet | `users` |
| **Column** | A column header: one kind of information | `first_name` |
| **Row** | One line: one record | Ada Lovelace's information |
| **Primary key** | A unique ID number for each row | `user_id` = 1 |
| **SQL** | The language we use to talk to the database | `SELECT * FROM users;` |

**CRUD** is the four things almost every app does with data:

| CRUD | SQL command | Example in a real app |
|---|---|---|
| **C**reate | `INSERT` | Sign up for an account |
| **R**ead | `SELECT` | View your profile |
| **U**pdate | `UPDATE` | Change your email |
| **D**elete | `DELETE` | Close your account |

❓ **Q1.** *Think of an app you use. Give one real example of each CRUD operation in it.*
C: ____________ R: ____________ U: ____________ D: ____________

---

## Part 2 — Practice in the SQLite Shell (20 min)

In this part, you'll type SQL directly into SQLite. **Type each command yourself** instead of copying it. It helps you learn the syntax.

**Step 1.** Open a terminal in any folder and start SQLite with a practice database:
```bash
sqlite3 practice.db
```
Your prompt changes to `sqlite>`. The file `practice.db` is created when you first save data.

**Step 2.** Turn on nicer output. Commands that start with a **dot** are SQLite shell commands, not SQL, and they don't need a semicolon:
```sql
.headers on
.mode box
```
*(If `.mode box` gives an error, your SQLite is older. Use `.mode column` instead.)*

⚠️ **Every SQL command ends with a semicolon `;`.** If you forget it, the prompt changes to `...>`, meaning SQLite is waiting for more. Just type `;` and press Enter.

### Create the table

**Step 3.** Create a `users` table:
```sql
CREATE TABLE users (
  user_id       INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TEXT DEFAULT CURRENT_TIMESTAMP
);
```

What each part means:

| Part | Meaning |
|---|---|
| `INTEGER`, `TEXT` | The **data type**: whole numbers or text |
| `PRIMARY KEY AUTOINCREMENT` | This column is the unique ID. SQLite fills it in for you: 1, 2, 3… |
| `NOT NULL` | This column can't be left empty |
| `UNIQUE` | No two rows can have the same value (no duplicate emails) |
| `DEFAULT CURRENT_TIMESTAMP` | If you don't give a value, SQLite saves the current date and time (in UTC) |

🔒 **Why `password_hash` and not `password`?** Real apps **never** save passwords as plain text. If the database leaked, every password would be exposed. They save a scrambled version called a **hash**. In this shell practice, we'll type fake placeholder values. In Part 4, Node will create real hashes for us.

**Step 4.** Check your work:
```sql
.tables
.schema users
```

❓ **Q2.** *What did `.tables` show? What did `.schema users` show?*
______________________________________________

### C — Create (INSERT)

**Step 5.** Add one user:
```sql
INSERT INTO users (first_name, last_name, email, password_hash)
VALUES ('Ada', 'Lovelace', 'ada@example.com', 'fake-hash-1');
```

**Step 6.** Add two users at once:
```sql
INSERT INTO users (first_name, last_name, email, password_hash)
VALUES ('Alan', 'Turing', 'alan@example.com', 'fake-hash-2'),
       ('Grace', 'Hopper', 'grace@example.com', 'fake-hash-3');
```

💡 Text values go in **single quotes** `'like this'`. Notice that we never typed a `user_id` or `created_at`.

### R — Read (SELECT)

**Step 7.** Try each query and look at the results:
```sql
-- Every column, every row
SELECT * FROM users;

-- Only some columns
SELECT first_name, email FROM users;

-- Only rows that match a condition
SELECT * FROM users WHERE user_id = 2;

-- Sorted by last name
SELECT first_name, last_name FROM users ORDER BY last_name;

-- Count the rows
SELECT COUNT(*) AS total FROM users;
```
*(Lines starting with `--` are SQL comments. SQLite ignores them.)*

❓ **Q3.** *What `user_id` did SQLite give each person? Where did the `created_at` values come from?*
______________________________________________

### U — Update (UPDATE)

**Step 8.** Change Ada's email, then check it:
```sql
UPDATE users SET email = 'ada.lovelace@example.com' WHERE user_id = 1;

SELECT user_id, email FROM users;
```

### D — Delete (DELETE)

**Step 9.** Delete Grace, then check:
```sql
DELETE FROM users WHERE user_id = 3;

SELECT user_id, first_name FROM users;
```

⚠️ **The most important rule in this activity:** `UPDATE` and `DELETE` without a `WHERE` change or delete **every row in the table**, and there is **no undo**. You'll see this in Part 6.

**Step 10.** Leave the shell:
```sql
.quit
```

✅ **Checkpoint 1:** You ran all four CRUD commands. Reopen the shell with `sqlite3 practice.db` and run `SELECT * FROM users;`. Ada and Alan should still be there. **The data survived!**

---

## Part 3 — Set Up the Node Project (10 min)

Now let's use the same SQL from JavaScript.

**Step 11.** Create a new project:
```bash
mkdir users-db
cd users-db
npm init -y
npm install better-sqlite3 bcryptjs
```
- **`better-sqlite3`** lets Node talk to a SQLite database.
- **`bcryptjs`** turns passwords into secure hashes.

**Step 12.** Create this folder structure. You'll fill in the files in the next steps.
```
users-db/
├── db/
│   ├── schema.sql      ← the CREATE TABLE command
│   ├── database.js     ← opens the database and creates the table
│   └── app.db          ← created automatically when you first run the app
├── models/
│   └── users.js        ← one function for each CRUD operation
├── app.js              ← runs and tests the functions
├── .gitignore
└── package.json
```

💡 **Why separate files?** Each file has **one job**. If you need to change a SQL query, you know to look in `models/users.js`. This is the same structure you'll use when we connect the database to Express.

**Step 13.** Create `.gitignore`:
```
node_modules/
*.db
```

❓ **Q4.** *Why do you think we keep `.db` files out of GitHub?*
______________________________________________

**Step 14.** Create `db/schema.sql`. It's the same table as Part 2, with one change: `IF NOT EXISTS`.
```sql
CREATE TABLE IF NOT EXISTS users (
  user_id       INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TEXT DEFAULT CURRENT_TIMESTAMP
);
```

**Step 15.** Create `db/database.js`:
```javascript
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Open (or create) the database file: db/app.db
const db = new Database(path.join(__dirname, 'app.db'));

// Create the users table if it doesn't exist yet
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

// Share this connection with other files
module.exports = db;
```

💡 **`module.exports`** lets other files use something from this file. Another file can now write `require('../db/database')` to get the same database connection. It works the same way as `require('express')`, but for your own code.

---

## Part 4 — Write the CRUD Functions (15 min)

**Step 16.** Create `models/users.js`:
```javascript
const bcrypt = require('bcryptjs');
const db = require('../db/database');

// CREATE: add a new user, return the new user's ID
function createUser(firstName, lastName, email, password) {
  const passwordHash = bcrypt.hashSync(password, 10);
  const result = db
    .prepare(`INSERT INTO users (first_name, last_name, email, password_hash)
              VALUES (?, ?, ?, ?)`)
    .run(firstName, lastName, email, passwordHash);
  return result.lastInsertRowid;
}

// READ: get every user (without the password hash!)
function getAllUsers() {
  return db
    .prepare('SELECT user_id, first_name, last_name, email FROM users')
    .all();
}

// READ: get one user by ID (undefined if not found)
function getUserById(userId) {
  return db
    .prepare('SELECT user_id, first_name, last_name, email FROM users WHERE user_id = ?')
    .get(userId);
}

// UPDATE: change a user's email, return how many rows changed
function updateUserEmail(userId, newEmail) {
  const result = db
    .prepare('UPDATE users SET email = ? WHERE user_id = ?')
    .run(newEmail, userId);
  return result.changes;
}

// DELETE: remove a user, return how many rows were deleted
function deleteUser(userId) {
  const result = db
    .prepare('DELETE FROM users WHERE user_id = ?')
    .run(userId);
  return result.changes;
}

module.exports = { createUser, getAllUsers, getUserById, updateUserEmail, deleteUser };
```

### How the code works

Every function follows the same two steps:
1. **`db.prepare(sql)`** gets the SQL command ready.
2. Then you **run** it, picking the method that matches what you want back:

| Method | Use it for | Gives you back |
|---|---|---|
| `.run(...)` | `INSERT`, `UPDATE`, `DELETE` | Info about the change: `changes` (rows affected) and `lastInsertRowid` (new ID) |
| `.get(...)` | `SELECT` for **one** row | One object, or `undefined` if nothing matched |
| `.all(...)` | `SELECT` for **many** rows | An array of objects (empty `[]` if nothing matched) |

🔒 **What are the `?` marks?** Each `?` is a **placeholder**. The values you pass to `.run()`, `.get()`, or `.all()` fill the `?`s **in order**. SQLite treats them as plain data, never as SQL code. **Never** build SQL by gluing strings together, like `"... WHERE email = '" + email + "'"`. A user could type SQL into a form and run it on your database. This attack is called **SQL injection**.

---

## Part 5 — Test Each Operation (15 min)

You'll run `app.js` four times, **replacing all of its code** each time.

### C — Create

**Step 17.** Put this in `app.js`:
```javascript
const users = require('./models/users');

const adaId = users.createUser('Ada', 'Lovelace', 'ada@example.com', 'secret123');
const alanId = users.createUser('Alan', 'Turing', 'alan@example.com', 'enigma42');

console.log('Created users with IDs:', adaId, alanId);
```
Run it **once**:
```bash
node app.js
```
❓ **Q5.** *What did it print? What new file appeared in the `db/` folder?*
______________________________________________

### R — Read

**Step 18.** Replace `app.js` with:
```javascript
const users = require('./models/users');

console.log('All users:');
console.table(users.getAllUsers());

console.log('User #1:', users.getUserById(1));
console.log('User #99:', users.getUserById(99));
```
Run `node app.js`.

❓ **Q6.** *We didn't create any users in this run. Why are Ada and Alan still there? What did `getUserById(99)` return?*
______________________________________________

### U — Update

**Step 19.** Replace `app.js` with:
```javascript
const users = require('./models/users');

const changed = users.updateUserEmail(1, 'ada.lovelace@example.com');
console.log('Rows changed:', changed);
console.log('User #1 now:', users.getUserById(1));
```
Run `node app.js`.

### D — Delete

**Step 20.** Replace `app.js` with:
```javascript
const users = require('./models/users');

const deleted = users.deleteUser(2);
console.log('Rows deleted:', deleted);

console.log('Users left:');
console.table(users.getAllUsers());
```
Run `node app.js`.

### Look inside the database

**Step 21.** Open your app's database in the SQLite shell:
```bash
sqlite3 db/app.db
```
```sql
.headers on
.mode box
SELECT * FROM users;
.quit
```

❓ **Q7.** *What does the `password_hash` column look like? Can you tell Ada's password was `secret123`?*
______________________________________________

✅ **Checkpoint 2:** Your Node app created, read, updated, and deleted users, and the SQLite shell shows the same data. Show a neighbor.

🔄 **Need to start over?** Delete `db/app.db`. The next `node app.js` creates a fresh, empty table.

---

## Part 6 — Break It & Fix It (15 min)
Try each one, write down what happens, then fix it. Rows A and F use your Node project. Rows B–E use `practice.db` in the SQLite shell.

| # | What to try | What happened? | How you fixed it |
|---|---|---|---|
| A | Put the **Create** code from Step 17 back in `app.js` and run it again | | |
| B | In the shell, run `UPDATE users SET last_name = 'Oops';` (no `WHERE`), then `SELECT * FROM users;` | | |
| C | Insert a user without a `first_name`: `INSERT INTO users (last_name, email, password_hash) VALUES ('Smith', 'smith@example.com', 'fake');` | | |
| D | Run `SELECT phone FROM users;` | | |
| E | Run `SELECT * FROM users WHERE first_name = 'ada';`, then `SELECT * FROM users WHERE first_name LIKE 'ada';` | | |
| F | Run the **Delete** code from Step 20 a second time | | |

---

## Part 7 — Concept Check
Answer in 1–2 sentences.

**Q8.** What is a primary key? Why don't we include `user_id` in our `INSERT` commands?
______________________________________________

**Q9.** Why do the `SELECT` queries in `models/users.js` list columns instead of using `SELECT *`?
______________________________________________

**Q10.** What do the `?` placeholders protect against? Explain in your own words.
______________________________________________

**Q11.** What's the difference between `.get()` and `.all()`?
______________________________________________

**Q12.** You deleted user #2 (Alan). If you create a new user now, what `user_id` will they get? Test it to check your answer.
______________________________________________

---

## Part 8 — Level Up (choose at least one)
- **🅰 Update a name:** Write `updateUserName(userId, firstName, lastName)` in `models/users.js`. Test it in `app.js`.
- **🅱 Search:** Write `searchByLastName(text)` that finds users whose last name **starts with** `text`. *Hint: `WHERE last_name LIKE ?` and pass `text + '%'`.*
- **🅲 Count:** Write `countUsers()` that returns the number of users. *Hint: `SELECT COUNT(*) AS total FROM users` and `.get()`.*
- **🅳 Check a password:** Write `checkPassword(email, password)` that returns `true` if the password is correct. *Hint: get the user's `password_hash` by email, then use `bcrypt.compareSync(password, hash)`.* This is the core of a login system!

---

## 🔮 Coming Up Next
Our CRUD functions work, but only from the terminal. Next, we'll connect them to **Express** and **Pug**: a sign-up form will **create** users, a page will **list** them, and buttons will **edit** and **delete** them.

---

## API Reference

### SQL commands
| Command | What it does | Example |
|---|---|---|
| `CREATE TABLE` | Makes a new table with columns and rules. Add `IF NOT EXISTS` to skip it when the table is already there. | `CREATE TABLE IF NOT EXISTS users (...);` |
| `INSERT INTO ... VALUES` | **Create:** adds one or more rows. | `INSERT INTO users (first_name) VALUES ('Ada');` |
| `SELECT ... FROM` | **Read:** gets rows. `*` means all columns. | `SELECT first_name, email FROM users;` |
| `WHERE` | Keeps only rows that match a condition. Works with `SELECT`, `UPDATE`, and `DELETE`. | `WHERE user_id = 1` |
| `ORDER BY` | Sorts the results. Add `DESC` for reverse order. | `ORDER BY last_name` |
| `LIKE` | Matches a pattern. `%` means "anything here." | `WHERE last_name LIKE 'T%'` |
| `COUNT(*)` | Counts rows. `AS` gives the result a name. | `SELECT COUNT(*) AS total FROM users;` |
| `UPDATE ... SET` | **Update:** changes values in existing rows. ⚠️ Always use `WHERE`. | `UPDATE users SET email = 'a@b.com' WHERE user_id = 1;` |
| `DELETE FROM` | **Delete:** removes rows. ⚠️ Always use `WHERE`. | `DELETE FROM users WHERE user_id = 3;` |
| `DROP TABLE` | Deletes a whole table **and all its data**. | `DROP TABLE users;` |

### Column rules
| Rule | What it does |
|---|---|
| `INTEGER` / `TEXT` | Data type: whole numbers or text |
| `PRIMARY KEY` | The column that uniquely identifies each row |
| `AUTOINCREMENT` | SQLite assigns the next ID automatically and never reuses old ones |
| `NOT NULL` | The value can't be missing |
| `UNIQUE` | No two rows can share the same value |
| `DEFAULT value` | The value to use when none is given |

### SQLite shell (dot commands — no semicolon needed)
| Command | What it does |
|---|---|
| `sqlite3 file.db` | (In the terminal) Opens or creates a database file |
| `.tables` | Lists all tables |
| `.schema table` | Shows the `CREATE TABLE` command for a table |
| `.headers on` | Shows column names in results |
| `.mode box` | Draws results as a table (`.mode column` on older versions) |
| `.quit` | Leaves the shell |

### better-sqlite3 (Node)
| Method | What it does | Example |
|---|---|---|
| `new Database(file)` | Opens a database file, creating it if needed. | `const db = new Database('app.db');` |
| `db.exec(sql)` | Runs SQL that returns no data, such as `CREATE TABLE`. | `db.exec(schema);` |
| `db.prepare(sql)` | Gets a SQL command ready to run. Use `?` for values. | `db.prepare('SELECT * FROM users WHERE user_id = ?')` |
| `.run(...values)` | Runs `INSERT`, `UPDATE`, or `DELETE`. Returns `{ changes, lastInsertRowid }`. | `.run('Ada', 'Lovelace')` |
| `.get(...values)` | Runs a `SELECT` and returns the **first** row, or `undefined`. | `.get(1)` |
| `.all(...values)` | Runs a `SELECT` and returns **all** rows as an array. | `.all()` |

### bcryptjs
| Method | What it does | Example |
|---|---|---|
| `bcrypt.hashSync(password, 10)` | Turns a password into a hash. `10` controls how much work it takes (higher is slower and safer). | `bcrypt.hashSync('secret123', 10)` |
| `bcrypt.compareSync(password, hash)` | Returns `true` if the password matches the hash. | `bcrypt.compareSync('secret123', user.password_hash)` |

### Node.js
| Item | What it does | Example |
|---|---|---|
| `module.exports` | Shares values or functions from a file so other files can `require` them. | `module.exports = { createUser };` |
| `fs.readFileSync(path, 'utf8')` | Reads a file's contents as text. | `fs.readFileSync('schema.sql', 'utf8')` |
| `console.table(array)` | Prints an array of objects as a table in the terminal. | `console.table(users.getAllUsers());` |

📘 **Full docs:** [sqlite.org/lang.html](https://sqlite.org/lang.html) · [better-sqlite3 API](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md) · [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

---

## Troubleshooting Cheat Sheet
| Problem | Likely cause |
|---|---|
| `sqlite3: command not found` | The SQLite shell isn't installed, or (on Windows) you're not in the folder with `sqlite3.exe` |
| The prompt shows `...>` | You forgot the semicolon. Type `;` and press Enter |
| `Parse error: near "...": syntax error` | A typo, a missing comma between columns, or double quotes `"` used for text (use single quotes `'`) |
| `UNIQUE constraint failed: users.email` | That email is already in the table |
| `NOT NULL constraint failed: users.first_name` | A required value is missing |
| `no such table: users` | The table wasn't created, or you opened a different `.db` file |
| `no such column: ...` | The column name is misspelled. Check it with `.schema users` |
| `Cannot find module 'better-sqlite3'` | You skipped `npm install`, or you're in the wrong folder |
| `npm install better-sqlite3` fails on Windows | Update Node to the current LTS version and try again |
| `Cannot find module '../db/database'` | Check the file path and folder names in your `require` |

---
---

# Answer Key

> Remove this section before handing the sheet out to students.

## Part 1 — Vocabulary

**Q1.** Answers vary. Example (Instagram): **C**: post a photo · **R**: scroll your feed · **U**: edit a caption · **D**: delete a post.

## Part 2 — SQLite Shell

**Q2.** `.tables` shows `users`, the only table in the database. `.schema users` shows the full `CREATE TABLE users (...)` command, including every column and rule.

**Q3.** Ada got `1`, Alan got `2`, and Grace got `3`, in the order they were inserted. `AUTOINCREMENT` assigns IDs automatically. `created_at` was filled by `DEFAULT CURRENT_TIMESTAMP`, which saves the date and time of the insert. *(The time is in UTC, so it may look several hours ahead of local time.)*

**Checkpoint 1:** Ada (with her new email) and Alan are still there after reopening. Grace is gone because she was deleted.

## Part 3 — Project Setup

**Q4.** The database holds **real data**, like users' emails and password hashes, that shouldn't be public. It's also a file that changes every time the app runs, so it would cause constant changes in Git. Each developer's app creates its own `app.db` from `schema.sql`. *(The `schema.sql` file **is** saved in Git. It's the recipe; the `.db` file is the meal.)*

## Part 5 — Testing

**Q5.** It prints `Created users with IDs: 1 2`. A new file, `db/app.db`, appears. `new Database()` created it, and `db.exec(schema)` built the `users` table inside it.

**Q6.** The users were saved in `db/app.db` **on disk** in the Create step. This run just reads them back. Unlike the array in Activity 3, the data survives after the program ends. `getUserById(99)` returns **`undefined`**, because `.get()` returns `undefined` when no row matches. It doesn't throw an error.

**Q7.** It looks like random characters starting with `$2b$10$`, for example `$2b$10$0OW2UBoNalpYb...`. You **can't** tell the password from it. `$2b$` is the bcrypt version, and `10$` is the work factor. Each user's hash is different, even for the same password, because bcrypt adds a random **salt**.

## Part 6 — Break It & Fix It

| # | What to try | What happened | Fix / lesson |
|---|---|---|---|
| A | Run Create again | `SqliteError: UNIQUE constraint failed: users.email`. The program crashes because `ada@example.com` already exists. | The `UNIQUE` rule is protecting the data. Use different emails, or delete `db/app.db` to start over. *(Next activity: catch this error and show "Email already registered" on the sign-up form.)* |
| B | `UPDATE` without `WHERE` | **Every** user's last name is now `Oops`. SQLite doesn't ask "are you sure?" | There is **no undo**. Fix each row with its own `UPDATE ... WHERE user_id = ?`, or `DROP TABLE users;` and redo Part 2. **Habit to teach:** run a `SELECT` with your `WHERE` first, to see exactly which rows will change. |
| C | Insert without `first_name` | `Runtime error: NOT NULL constraint failed: users.first_name`. Nothing is saved. | Include a `first_name`. The `NOT NULL` rule stops incomplete records. |
| D | `SELECT phone` | `Parse error: no such column: phone` | The table has no `phone` column. Use `.schema users` to check column names. *(Adding a column is possible with `ALTER TABLE`, a good extra topic.)* |
| E | `=` vs `LIKE` | `= 'ada'` returns **nothing**, because `=` is case-sensitive and the data has `Ada`. `LIKE 'ada'` **finds Ada**, because in SQLite `LIKE` ignores upper/lower case for English letters. | Match the case exactly with `=`, or use `LIKE`. *(This matters for emails: store them in lowercase so `Ada@Example.com` and `ada@example.com` count as the same.)* |
| F | Delete user #2 again | `Rows deleted: 0`, with **no error**. Alan was already gone, so nothing matched. | Nothing to fix. The return value is how you know whether it worked. In a web app, `0` would mean "show a 404: user not found." |

## Part 7 — Concept Check

**Q8.** A primary key is a column whose value **uniquely identifies each row**. No two rows share it, and it never changes. We leave out `user_id` because `INTEGER PRIMARY KEY AUTOINCREMENT` tells SQLite to assign the next number itself. That way, there's no risk of picking an ID that's already taken.

**Q9.** So the `password_hash` is **never sent** anywhere it isn't needed. If this data later goes to a web page or an API, `SELECT *` would leak the hashes. Listing columns also makes it clear what data each function returns.

**Q10.** They protect against **SQL injection**. If you glue user input into a SQL string, someone could type SQL code into a form field, such as `x' OR '1'='1`, and change what the query does: read every row, or even delete data. With `?`, the value is always treated as **plain data**, never as SQL code.

*Optional demo for class:*
```javascript
const evil = "nobody@x.com' OR '1'='1";

// ❌ String gluing: returns EVERY user, even though no email matches
db.prepare("SELECT user_id, email FROM users WHERE email = '" + evil + "'").all();

// ✅ Placeholder: returns [] (looks for an email literally equal to that text)
db.prepare('SELECT user_id, email FROM users WHERE email = ?').all(evil);
```

**Q11.** `.get()` returns **one** row as an object, or `undefined` if there's no match. Use it when you expect one result, like finding a user by ID. `.all()` returns an **array** of every matching row, or `[]` if there are none. Use it for lists.

**Q12.** The new user gets ID **`3`**, not `2`. `AUTOINCREMENT` never reuses an ID, even after the row is deleted. This prevents mix-ups: an old link to `/users/2` will never accidentally show a different person.

## Part 8 — Level Up (sample solutions)

Add each function to `models/users.js` **and** to the `module.exports` list.

**🅰 Update a name**
```javascript
function updateUserName(userId, firstName, lastName) {
  const result = db
    .prepare('UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?')
    .run(firstName, lastName, userId);
  return result.changes;
}
```
**Check for:** values passed in the **same order** as the `?`s, and a `WHERE` clause.

**🅱 Search**
```javascript
function searchByLastName(text) {
  return db
    .prepare('SELECT user_id, first_name, last_name, email FROM users WHERE last_name LIKE ?')
    .all(text + '%');
}
```
**Check for:** the `%` goes in the **value**, not inside the SQL string, and the `?` has no quotes around it. `searchByLastName('lo')` finds `Lovelace`.

**🅲 Count**
```javascript
function countUsers() {
  return db.prepare('SELECT COUNT(*) AS total FROM users').get().total;
}
```
**Check for:** `.get()` (one row) and `.total` to pull the number out of the object.

**🅳 Check a password**
```javascript
function checkPassword(email, password) {
  const user = db
    .prepare('SELECT password_hash FROM users WHERE email = ?')
    .get(email);
  if (!user) return false; // no user with that email
  return bcrypt.compareSync(password, user.password_hash);
}
```
Test it:
```javascript
console.log(users.checkPassword('ada.lovelace@example.com', 'secret123')); // true
console.log(users.checkPassword('ada.lovelace@example.com', 'wrong'));     // false
console.log(users.checkPassword('nobody@example.com', 'secret123'));      // false
```
**Check for:** the `if (!user)` check. Without it, an unknown email crashes the program with `Cannot read properties of undefined`.
