# CSC 317 — Activity 5: Color Book (Login + Pug + SQLite)


## Learning Objectives
By the end of this activity, you will be able to:
1. Design two related tables using a **foreign key**
2. Explain a **one-to-many** relationship
3. Let users **sign up, log in, and log out** using sessions
4. Protect pages so only logged-in users can see them
5. Connect Pug forms to SQLite to add, show, and delete data

## Before You Start
- [ ] You finished Activity 4, and your `users-db` project works
- [ ] You remember Activity 3's form pattern: validate → show errors **or** save and redirect

💡 **Big idea:** Each user gets their **own** color book. When Ada logs in, she sees only Ada's colors. When Alan logs in, he sees only Alan's. The database keeps track of **who owns what**.

**What you'll build:**

```
┌──────────────────────────────────────────────────────┐
│ 🎨 Color Book                  Hi, Ada!  [Log out]   │
├──────────────────────────────────────────────────────┤
│ Ada's Color Book (2)                                 │
│                                                      │
│  Color name [__________]  Color [■]  Pantone [____]  │
│  [Add color]                                         │
│                                                      │
│     ⬤             ⬤                                 │
│    Gold        SFSU Purple                           │
│  #c99700        #4b2e83                              │
│               Pantone 2685 C                         │
│  [Delete]       [Delete]                             │
└──────────────────────────────────────────────────────┘
```

---

## Part 1 — Plan the Database (10 min)

We need **two tables**: one for users (you already have it) and one for colors.

```
        users                                  colors
┌─────────────────────┐            ┌──────────────────────────┐
│ user_id   (PK) ─────┼──┐         │ color_id  (PK)           │
│ first_name          │  │         │ user_id   (FK) ◄─────────┼── points to users.user_id
│ last_name           │  └────────►│ name                     │
│ email               │   one      │ hex                      │
│ password_hash       │   to many  │ pantone   (optional)     │
│ created_at          │            │                          │
└─────────────────────┘            └──────────────────────────┘
```

| Term | Meaning | In our app |
|---|---|---|
| **Foreign key (FK)** | A column that stores the **primary key of a row in another table**. It links the two rows. | `colors.user_id` holds the ID of the user who owns the color |
| **One-to-many** | One row in table A can be linked to **many** rows in table B. | One user has many colors. Each color has exactly one owner |
| **`ON DELETE CASCADE`** | When the "parent" row is deleted, its "child" rows are deleted too. | Delete a user, and their colors are deleted automatically |
| **`UNIQUE (a, b)`** | The **combination** of two columns must be unique. | One user can't have two colors named "Gold," but two different users can |

❓ **Q1.** *Look at this `colors` data. Who owns each color? Which row breaks the `UNIQUE (user_id, name)` rule?*

| color_id | user_id | name |
|---|---|---|
| 1 | 1 | Gold |
| 2 | 1 | Sky Blue |
| 3 | 4 | Gold |
| 4 | 1 | Gold |

______________________________________________

---

## Part 2 — Set Up the Project (10 min)

**Step 1.** Make a copy of your Activity 4 project, and work in the copy:
```bash
cp -r users-db color-book
cd color-book
```
*(On Windows, copy and rename the folder in File Explorer.)*

**Step 2.** Install the packages for the web part:
```bash
npm install express pug express-session
```
- **`express`** and **`pug`**: from Activities 1–3
- **`express-session`**: **new!** It remembers who is logged in

**Step 3.** Delete the old `app.js`. Then set up this structure (✏️ = change, 🆕 = new):
```
color-book/
├── db/
│   ├── schema.sql          ✏️ add the colors table
│   ├── database.js         ✏️ turn on foreign keys
│   └── app.db              (your users from Activity 4 are still in here)
├── models/
│   ├── users.js            ✏️ add authenticate()
│   └── colors.js           🆕
├── middleware/
│   └── requireLogin.js     🆕
├── views/
│   ├── layout.pug          🆕
│   ├── signup.pug          🆕
│   ├── login.pug           🆕
│   └── colors.pug          🆕
├── public/
│   └── css/style.css       🆕
├── server.js               🆕
├── .gitignore
└── package.json
```

**Step 4.** Add the `colors` table to the **end** of `db/schema.sql`. Keep the `users` table that's already there.
```sql
CREATE TABLE IF NOT EXISTS colors (
  color_id  INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id   INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  name      TEXT NOT NULL,
  hex       TEXT NOT NULL,
  pantone   TEXT,
  UNIQUE (user_id, name)
);
```

| Part | Meaning |
|---|---|
| `REFERENCES users(user_id)` | This is a **foreign key**. The value must match a `user_id` in the `users` table |
| `ON DELETE CASCADE` | If that user is deleted, delete this color too |
| `pantone TEXT` (no `NOT NULL`) | Optional. Not every color has a Pantone number |
| `UNIQUE (user_id, name)` | No duplicate color names **for the same user** |

**Step 5.** Replace `db/database.js` with this version. Only one line is new: the `pragma`.
```javascript
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Open (or create) the database file: db/app.db
const db = new Database(path.join(__dirname, 'app.db'));

// SQLite ignores foreign keys unless you turn them on (every connection!)
db.pragma('foreign_keys = ON');

// Create the tables if they don't exist yet
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

module.exports = db;
```

⚠️ **SQLite surprise:** for historical reasons, SQLite **does not enforce foreign keys** unless you turn them on with `foreign_keys = ON`. Without this line, `REFERENCES` and `ON DELETE CASCADE` silently do nothing. You'll test this in Part 8.

---

## Part 3 — The Models (10 min)

**Step 6.** Replace `models/users.js`. We keep `createUser` from Activity 4 and add `authenticate`, which checks an email and password for login.
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

// LOGIN: return the user if the email and password match, otherwise null
function authenticate(email, password) {
  const user = db
    .prepare('SELECT user_id, first_name, password_hash FROM users WHERE email = ?')
    .get(email);
  if (!user) return null;                                             // no such email
  if (!bcrypt.compareSync(password, user.password_hash)) return null; // wrong password
  return { userId: user.user_id, firstName: user.first_name };
}

module.exports = { createUser, authenticate };
```

**Step 7.** Create `models/colors.js`:
```javascript
const db = require('../db/database');

// CREATE: add a color to a user's color book
function addColor(userId, name, hex, pantone) {
  const result = db
    .prepare('INSERT INTO colors (user_id, name, hex, pantone) VALUES (?, ?, ?, ?)')
    .run(userId, name, hex, pantone || null);
  return result.lastInsertRowid;
}

// READ: get all colors for ONE user, sorted by name
function getColorsForUser(userId) {
  return db
    .prepare('SELECT color_id, name, hex, pantone FROM colors WHERE user_id = ? ORDER BY name')
    .all(userId);
}

// DELETE: remove a color, but only if it belongs to this user
function deleteColor(colorId, userId) {
  const result = db
    .prepare('DELETE FROM colors WHERE color_id = ? AND user_id = ?')
    .run(colorId, userId);
  return result.changes;
}

module.exports = { addColor, getColorsForUser, deleteColor };
```

❓ **Q2.** *Every function in `colors.js` uses `user_id`. Why does `deleteColor` check `user_id` and not just `color_id`?*
______________________________________________

---

## Part 4 — How Login Works (5 min)

**The problem:** HTTP has no memory. Every request is brand new, so the server can't tell that the person asking for `/colors` is the same person who just logged in.

**The solution: a session.**
1. When you log in, the server saves your `userId` in a **session**, which lives on the server.
2. The server gives your browser a **cookie** holding a random session ID, like a coat-check ticket.
3. The browser sends that cookie with **every** request. The server looks up the ticket and finds your `userId`.

```
Browser                                   Server
   │  POST /login (email + password)         │
   │ ──────────────────────────────────────► │  ✔ password correct
   │                                         │  req.session.userId = 1
   │  ◄─── 302 redirect + cookie: sid=x7Kq…  │
   │                                         │
   │  GET /colors  (cookie: sid=x7Kq…)       │
   │ ──────────────────────────────────────► │  look up x7Kq… → userId 1
   │  ◄───────────── Ada's color book ────── │
```

In code, the session is just an object: **`req.session`**. Whatever you put in it on one request is still there on the next request from the same browser.

**Step 8.** Create `middleware/requireLogin.js`:
```javascript
// Only let logged-in users through. Everyone else goes to the login page.
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next(); // logged in: continue to the route
}

module.exports = requireLogin;
```

💡 **Middleware** is a function that runs **before** your route. It can stop the request (here, by redirecting) or call **`next()`** to pass it along. You'll add it to a route like this: `app.get('/colors', requireLogin, (req, res) => { ... })`.

---

## Part 5 — The Server (15 min)

**Step 9.** Create `server.js`. Read the comments as you type. Each section is a pattern you've seen before.
```javascript
const express = require('express');
const session = require('express-session');
const path = require('path');

const users = require('./models/users');
const colors = require('./models/colors');
const requireLogin = require('./middleware/requireLogin');

const app = express();
const PORT = process.env.PORT || 3000;

// ----- Setup -----
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Sessions: remember who is logged in between requests
app.use(session({
  secret: 'csc317-change-this-secret',
  resave: false,
  saveUninitialized: false
}));

// Make the logged-in user's name available in every template
app.use((req, res, next) => {
  res.locals.currentUser = req.session.firstName;
  next();
});

// ----- Home -----
app.get('/', (req, res) => {
  res.redirect(req.session.userId ? '/colors' : '/login');
});

// ----- Sign up -----
app.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign up', errors: [], values: {} });
});

app.post('/signup', (req, res) => {
  const firstName = (req.body.firstName || '').trim();
  const lastName = (req.body.lastName || '').trim();
  const email = (req.body.email || '').trim().toLowerCase();
  const password = req.body.password || '';

  const errors = [];
  if (!firstName || !lastName) errors.push('First and last name are required.');
  if (!email.includes('@')) errors.push('Please enter a valid email.');
  if (password.length < 8) errors.push('Password must be at least 8 characters.');

  if (errors.length === 0) {
    try {
      const userId = users.createUser(firstName, lastName, email, password);
      req.session.userId = userId;        // log the new user in
      req.session.firstName = firstName;
      return res.redirect('/colors');
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        errors.push('That email is already registered.');
      } else {
        throw err;
      }
    }
  }

  res.status(400).render('signup', {
    title: 'Sign up', errors, values: { firstName, lastName, email }
  });
});

// ----- Log in / Log out -----
app.get('/login', (req, res) => {
  res.render('login', { title: 'Log in', errors: [], values: {} });
});

app.post('/login', (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase();
  const password = req.body.password || '';

  const user = users.authenticate(email, password);
  if (!user) {
    return res.status(401).render('login', {
      title: 'Log in', errors: ['Invalid email or password.'], values: { email }
    });
  }

  req.session.userId = user.userId;
  req.session.firstName = user.firstName;
  res.redirect('/colors');
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// ----- Color Book (login required) -----
app.get('/colors', requireLogin, (req, res) => {
  res.render('colors', {
    title: 'My Color Book',
    colors: colors.getColorsForUser(req.session.userId),
    errors: [],
    values: {}
  });
});

app.post('/colors', requireLogin, (req, res) => {
  const name = (req.body.name || '').trim();
  const hex = (req.body.hex || '').trim().toLowerCase();
  const pantone = (req.body.pantone || '').trim();

  const errors = [];
  if (!name) errors.push('Color name is required.');
  if (!/^#[0-9a-f]{6}$/.test(hex)) errors.push('Hex code must look like #1a2b3c.');
  if (pantone.length > 20) errors.push('Pantone number is too long.');

  if (errors.length === 0) {
    try {
      colors.addColor(req.session.userId, name, hex, pantone);
      return res.redirect('/colors');
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        errors.push(`You already have a color named "${name}".`);
      } else {
        throw err;
      }
    }
  }

  res.status(400).render('colors', {
    title: 'My Color Book',
    colors: colors.getColorsForUser(req.session.userId),
    errors,
    values: { name, hex, pantone }
  });
});

app.post('/colors/:colorId/delete', requireLogin, (req, res) => {
  colors.deleteColor(req.params.colorId, req.session.userId);
  res.redirect('/colors');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

### Three new things in this file

**1. `try` / `catch` for database errors.** In Activity 4, a duplicate email **crashed** the program. Here, we **catch** the error and turn it into a friendly message. `err.code` tells us *which* error it was. Any other error is re-thrown with `throw err`, so real bugs still show up.

**2. The hex check: `/^#[0-9a-f]{6}$/`.** This is a **regular expression**, a pattern for text. Read it as: *start* `^`, a `#`, then exactly 6 `{6}` characters that are digits or a–f `[0-9a-f]`, then *end* `$`. So `#4b2e83` passes, and `red` or `#12345` fail.

**3. `req.session`.** Logging in **writes** to it (`req.session.userId = ...`). `requireLogin` **reads** it. Logging out **destroys** it.

❓ **Q3.** *The login error says "Invalid email or password." and not "No account with that email." Why is the vaguer message safer?*
______________________________________________

---

## Part 6 — The Views (15 min)

**Step 10.** Create `views/layout.pug`. The nav changes depending on whether someone is logged in. Errors are shown here, so every page gets them.
```pug
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport" content="width=device-width, initial-scale=1.0")
    title= title
    link(rel="stylesheet" href="/css/style.css")
  body
    header
      h1 🎨 Color Book
      nav
        if currentUser
          span Hi, #{currentUser}!
          form.inline(action="/logout" method="POST")
            button(type="submit") Log out
        else
          a(href="/login") Log in
          a(href="/signup") Sign up
    main
      if errors && errors.length
        ul.errors
          each error in errors
            li= error
      block content
```

**Step 11.** Create `views/signup.pug`:
```pug
extends layout

block content
  h2 Create an account
  form(action="/signup" method="POST")
    label(for="firstName") First name
    input#firstName(type="text" name="firstName" value=values.firstName required)

    label(for="lastName") Last name
    input#lastName(type="text" name="lastName" value=values.lastName required)

    label(for="email") Email
    input#email(type="email" name="email" value=values.email required)

    label(for="password") Password (at least 8 characters)
    input#password(type="password" name="password" minlength="8" required)

    button(type="submit") Sign up
  p Already have an account? #[a(href="/login") Log in]
```

💡 `#[a(href="/login") Log in]` puts a tag **inside** a line of text. We never send the password back in `values`, so the user retypes it after an error.

**Step 12.** Create `views/login.pug`:
```pug
extends layout

block content
  h2 Log in
  form(action="/login" method="POST")
    label(for="email") Email
    input#email(type="email" name="email" value=values.email required)

    label(for="password") Password
    input#password(type="password" name="password" required)

    button(type="submit") Log in
  p New here? #[a(href="/signup") Create an account]
```

**Step 13.** Create `views/colors.pug`:
```pug
extends layout

block content
  h2 #{currentUser}'s Color Book (#{colors.length})

  form(action="/colors" method="POST")
    label(for="name") Color name
    input#name(type="text" name="name" value=values.name required)

    label(for="hex") Color
    input#hex(type="color" name="hex" value=values.hex || '#4b2e83')

    label(for="pantone") Pantone number (optional)
    input#pantone(type="text" name="pantone" value=values.pantone placeholder="e.g. 2685 C")

    button(type="submit") Add color

  if colors.length
    ul.color-grid
      each color in colors
        li.color-card
          .swatch(style={ 'background-color': color.hex })
          h3= color.name
          p.hex= color.hex
          if color.pantone
            p Pantone #{color.pantone}
          form(action=`/colors/${color.color_id}/delete` method="POST")
            button.delete(type="submit") Delete
  else
    p Your color book is empty. Add your first color!
```

> 💡 **The new Pug lines:**
> - **`input(type="color")`** shows the browser's built-in color picker, and it sends the color as a hex code like `#4b2e83`. `values.hex || '#4b2e83'` means "use the value the user picked before, or purple if there isn't one."
> - **`.swatch(style={ 'background-color': color.hex })`** builds a `style` attribute from a JavaScript object. It becomes `<div class="swatch" style="background-color:#4b2e83;">`. The CSS makes it a circle.
> - **`` action=`/colors/${color.color_id}/delete` ``** uses a JavaScript **template literal** (backticks) to put each color's ID into its delete URL, such as `/colors/7/delete`. The server reads it as `req.params.colorId`.

**Step 14.** Create `public/css/style.css`:
```css
body {
  font-family: system-ui, sans-serif;
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  background: #f7f5ff;
  color: #222;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid #4b2e83;
  margin-bottom: 1rem;
}

nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}

form {
  display: grid;
  gap: 0.5rem;
  max-width: 400px;
  margin-bottom: 2rem;
}

form.inline {
  display: inline;
  margin: 0;
}

input, button {
  font: inherit;
  padding: 0.4rem;
}

input[type="color"] {
  width: 4rem;
  height: 2.5rem;
  padding: 0;
}

button {
  background: #4b2e83;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.delete {
  background: #b00020;
}

.errors {
  color: #b00020;
  background: #fde8eb;
  padding: 0.75rem 2rem;
  border-radius: 4px;
}

.color-grid {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}

.color-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.color-card form {
  margin: 0;
}

.swatch {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
  border: 1px solid #ccc;
}

.hex {
  font-family: monospace;
}
```

---

## Part 7 — Try It Out (15 min)

**Step 15.** Start the server and open **http://localhost:3000**:
```bash
node server.js
```

**Step 16.** Work through this checklist:
- [ ] Visit `/colors` while logged out. You're sent to the login page.
- [ ] Log in as **Ada** from Activity 4 (`ada.lovelace@example.com` / `secret123`).
- [ ] Add 3 colors. Give at least one a Pantone number (SFSU Purple is `2685 C`).
- [ ] Log out, then **sign up** as a new user.
- [ ] The new user's color book is **empty**. Add 2 colors, and use the **same name** as one of Ada's colors.
- [ ] Log out and log back in as Ada. Her colors are still there, and the new user's colors are **not**.
- [ ] Delete one of Ada's colors.

✅ **Checkpoint 1:** Two users each see only their own colors. Show a neighbor.

**Step 17.** Leave the server running. In a **second terminal**, open the database:
```bash
sqlite3 db/app.db
```
```sql
.headers on
.mode box
SELECT * FROM colors;
```

❓ **Q4.** *How can you tell from the `colors` table which colors belong to Ada?*
______________________________________________

**Step 18.** Now ask a question that needs **both** tables. A **`JOIN`** matches rows from two tables using the foreign key:
```sql
SELECT users.first_name, colors.name, colors.hex
FROM colors
JOIN users ON colors.user_id = users.user_id
ORDER BY users.first_name;
```
Read it as: *"For each color, find the user whose `user_id` matches, and show the user's first name next to the color."*

❓ **Q5.** *What does `ON colors.user_id = users.user_id` do?*
______________________________________________

Keep this shell open for Part 8. Type `.quit` when you're done.

---

## Part 8 — Break It & Fix It (20 min)
Try each one, write down what happens, then undo it.

| # | What to try | What happened? | How you fixed it |
|---|---|---|---|
| A | **In the SQLite shell** (no pragma yet), add a color for a user who doesn't exist: `INSERT INTO colors (user_id, name, hex) VALUES (99, 'Ghost', '#ffffff');` Then run `PRAGMA foreign_keys = ON;` and try again with the name `'Ghost 2'`. | | |
| B | Log in as Ada and add a color with a name she **already has**. | | |
| C | In DevTools → **Elements**, change the color input's `type="color"` to `type="text"`. Type `banana` as the color and submit. | | |
| D | In `server.js`, comment out the `if (!/^#[0-9a-f]{6}$/...` line and restart. Repeat row C, but type `red; position:fixed; inset:0` as the color. | | |
| E | In DevTools, find a delete form and change its `action` to the ID of a color owned by **another user** (look it up in the shell). Submit. Then remove `AND user_id = ?` from `deleteColor` (and pass only `colorId` to `.run()`), restart, and try again. | | |
| F | While logged in, **restart the server** (`Ctrl + C`, then `node server.js`). Refresh `/colors`. | | |

⚠️ After row D and row E, **put the code back** and restart. Delete any "Ghost" rows with `DELETE FROM colors WHERE user_id = 99;`

---

## Part 9 — Concept Check
Answer in 1–2 sentences.

**Q6.** What is a foreign key? Name the foreign key in this activity.
______________________________________________

**Q7.** Why is the relationship between `users` and `colors` called **one-to-many**?
______________________________________________

**Q8.** We could have made `(user_id, name)` the **primary key** of `colors` and skipped `color_id`. What would the delete URL look like for a color named "Sky Blue"? Why is `color_id` easier?
______________________________________________

**Q9.** Where is `userId` stored while you're logged in: in the browser, or on the server? What does the browser keep?
______________________________________________

**Q10.** In row F, you were logged out, but your colors were still there. Why did one disappear and not the other?
______________________________________________

**Q11.** Why do we put `requireLogin` on the `POST` routes too, not just on `GET /colors`?
______________________________________________

---

## Part 10 — Level Up (choose at least one)
- **🅰 Edit a color:** Add an **Edit** link to each card. It goes to `GET /colors/:colorId/edit` (a form filled in with the color's current values). That form posts to `POST /colors/:colorId/edit`, which saves with an `UPDATE ... WHERE color_id = ? AND user_id = ?`.
- **🅱 Sort A–Z properly:** Add a color named `aqua` and one named `Blue`. Which comes first? Fix the order with `ORDER BY name COLLATE NOCASE`.
- **🅲 Members page:** Make a `/members` page (login required) that lists every user's first name and how many colors they've saved. *Hint: `LEFT JOIN`, `COUNT(colors.color_id)`, and `GROUP BY users.user_id`.*
- **🅳 Delete my account:** Add a "Delete my account" button that sends `POST /account/delete`. Delete the user, destroy the session, and redirect to `/signup`. Check in the shell that their colors were deleted **automatically**.
  ❓ **Q12.** *Which line in `schema.sql` made the colors disappear?*
  ______________________________________________

---

## 🔮 Coming Up Next
Right now, sessions live in the server's **memory**, so every restart logs everyone out (row F). Next, we can store sessions in the database, use environment variables for the session secret, and get the app ready to put online.

---

## Submission
- [ ] Screenshot of a color book with at least 3 colors (one with a Pantone number)
- [ ] Screenshot of a second user's color book, showing different colors
- [ ] Screenshot of the `JOIN` query results from Step 18
- [ ] Completed Parts 8 and 9
- [ ] At least one Level Up challenge

---

## API Reference

### SQL (new in this activity)
| Syntax | What it does | Example |
|---|---|---|
| `REFERENCES table(column)` | Makes a column a **foreign key** that must match a row in another table. | `user_id INTEGER REFERENCES users(user_id)` |
| `ON DELETE CASCADE` | When the parent row is deleted, delete the child rows too. | `REFERENCES users(user_id) ON DELETE CASCADE` |
| `UNIQUE (col1, col2)` | The **combination** of the columns must be unique. | `UNIQUE (user_id, name)` |
| `PRAGMA foreign_keys = ON` | Turns on foreign key checks for **this connection**. SQLite has them off by default. | `PRAGMA foreign_keys = ON;` |
| `JOIN ... ON` | Combines rows from two tables where the condition matches. | `FROM colors JOIN users ON colors.user_id = users.user_id` |
| `LEFT JOIN` | Like `JOIN`, but keeps rows from the first table even with no match. | `FROM users LEFT JOIN colors ON ...` |
| `GROUP BY` | Groups rows so functions like `COUNT` work per group. | `GROUP BY users.user_id` |
| `COLLATE NOCASE` | Compares or sorts text while ignoring upper/lower case. | `ORDER BY name COLLATE NOCASE` |
| `table.column` | Names a column by its table, to avoid confusion when two tables have the same column name. | `users.user_id` |

### express-session
| Item | What it does | Example |
|---|---|---|
| `session({ secret, resave, saveUninitialized })` | Middleware that adds `req.session`. `secret` signs the session cookie. `resave: false` and `saveUninitialized: false` avoid saving sessions that haven't changed or have nothing in them. | `app.use(session({ secret: '...', resave: false, saveUninitialized: false }));` |
| `req.session` | An object that's kept between requests from the same browser. | `req.session.userId = 1;` |
| `req.session.destroy(callback)` | Deletes the session (logs the user out), then runs the callback. | `req.session.destroy(() => res.redirect('/login'));` |

### Express (new in this activity)
| Item | What it does | Example |
|---|---|---|
| Middleware `(req, res, next)` | A function that runs before routes. Call `next()` to continue, or send a response to stop. | `function requireLogin(req, res, next) { ... }` |
| Route middleware | Add middleware to **one** route by listing it before the handler. | `app.get('/colors', requireLogin, handler)` |
| `res.locals` | Data available to every template rendered **for this request**. | `res.locals.currentUser = 'Ada';` |
| `req.params` | The named parts of the URL. | `/colors/7/delete` → `req.params.colorId === '7'` |
| `res.status(401)` | "Unauthorized": the login failed. | `res.status(401).render('login', ...)` |

### Models in this activity
| Function | What it does | Returns |
|---|---|---|
| `users.createUser(first, last, email, password)` | Hashes the password and inserts a user. | New `user_id` (throws if the email exists) |
| `users.authenticate(email, password)` | Checks an email and password. | `{ userId, firstName }` or `null` |
| `colors.addColor(userId, name, hex, pantone)` | Inserts a color for a user. | New `color_id` (throws on a duplicate name) |
| `colors.getColorsForUser(userId)` | Gets one user's colors, sorted by name. | An array of colors |
| `colors.deleteColor(colorId, userId)` | Deletes a color **only if** this user owns it. | Number of rows deleted (`0` or `1`) |

### JavaScript & Pug
| Syntax | What it does | Example |
|---|---|---|
| `try { } catch (err) { }` | Runs code, and if it throws an error, handles it in `catch` instead of crashing. | `catch (err) { if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') ... }` |
| `/pattern/.test(text)` | A **regular expression**. `.test()` returns `true` if the text matches. | `/^#[0-9a-f]{6}$/.test('#4b2e83')` → `true` |
| `` `text ${value}` `` | A **template literal**: puts a value inside a string. | `` `/colors/${color.color_id}/delete` `` |
| `input(type="color")` | The browser's color picker. Sends a hex code like `#4b2e83`. | `input(type="color" name="hex")` |
| `style={ prop: value }` | Pug builds a `style` attribute from an object. | `.swatch(style={ 'background-color': color.hex })` |
| `#[tag text]` | Puts a tag inside a line of text. | `p New here? #[a(href="/signup") Sign up]` |

📘 **Full docs:** [express-session](https://github.com/expressjs/session) · [SQLite foreign keys](https://sqlite.org/foreignkeys.html) · [SQLite SELECT and JOIN](https://sqlite.org/lang_select.html) · [MDN: Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)

---

## Troubleshooting Cheat Sheet
| Problem | Likely cause |
|---|---|
| `Cannot find module 'express-session'` | You skipped `npm install express pug express-session` |
| `TypeError: Cannot read properties of undefined (reading 'firstName')` | The `session(...)` middleware is missing, or it comes **after** the `res.locals` middleware |
| Logging in sends you right back to `/login` | `req.session.userId` isn't being set, or there's a typo (`userID` vs `userId`) |
| Ada's login fails | Her email was changed in Activity 4. Try `ada.lovelace@example.com` |
| `no such table: colors` | The `colors` table isn't in `schema.sql`, or the file has a typo. Restart the server after fixing it |
| `NOT NULL constraint failed: colors.user_id` | A route is missing `requireLogin`, so `req.session.userId` is empty |
| `FOREIGN KEY constraint failed` | You're adding a color for a `user_id` that doesn't exist |
| `RangeError: Too many parameter values were provided` | You passed more values to `.run()` / `.get()` than there are `?`s |
| Colors don't disappear when a user is deleted | `foreign_keys = ON` is missing for that connection |
| The circle is missing | Check `.swatch` in the CSS and the `style={...}` line in `colors.pug` |
| Everyone is logged out after a restart | Expected! Sessions are stored in memory (see row F) |

---
---

# Answer Key (One of these questions could be used in mid-term-2!!)
> Remove this section before handing the sheet out to students.

## Part 1 — Plan the Database

**Q1.** Rows 1, 2, and 4 belong to **user 1**. Row 3 belongs to **user 4**. **Row 4 breaks the rule**: user 1 already has a color named "Gold" (row 1). Row 3 is fine, because a **different** user can use the same name.

## Part 3 — The Models

**Q2.** Without the `user_id` check, **any logged-in user could delete anyone's color** just by changing the number in the URL (e.g. `/colors/1/delete`). Checking `color_id = ? AND user_id = ?` means the row is deleted only if it belongs to the person making the request. If not, nothing matches and 0 rows are deleted. *(Students test this in row E.)*

## Part 5 — The Server

**Q3.** A specific message like "No account with that email" tells an attacker **which emails are registered**. They could then focus on guessing passwords for those accounts, or learn that a specific person uses the site. The vague message gives away nothing.

## Part 7 — Try It Out

**Q4.** Every color row has a `user_id` column. Ada's `user_id` is `1` (from Activity 4), so every row with `user_id = 1` is hers. *(Students can confirm with `SELECT user_id, first_name FROM users;`.)*

**Q5.** It tells SQLite **how the two tables connect**. For each row in `colors`, it finds the row in `users` with the **same `user_id`** and combines them into one result row. Without it, SQLite wouldn't know which user goes with which color.

## Part 8 — Break It & Fix It

| # | What to try | What happened | Fix / lesson |
|---|---|---|---|
| A | FK test in the shell | **Without** the pragma, the `Ghost` row is added with `user_id` 99, even though no such user exists. This is an "orphan" row. **With** `PRAGMA foreign_keys = ON;`, the second insert fails: `FOREIGN KEY constraint failed`. | The pragma works **per connection**. Our app turns it on in `database.js`, but the shell is a separate connection, so it needs its own `PRAGMA`. Remove the orphan with `DELETE FROM colors WHERE user_id = 99;` |
| B | Duplicate color name | The page shows **"You already have a color named "Gold"."** (status 400), and the form keeps the input. Nothing is added. | Nothing to fix. The `UNIQUE (user_id, name)` rule threw `SQLITE_CONSTRAINT_UNIQUE`, and our `try` / `catch` turned it into a message. *(Remind students that in Activity 4, this kind of error crashed the program.)* |
| C | Fake color `banana` | **"Hex code must look like #1a2b3c."** Nothing is saved. | Nothing to fix. The server's regular expression caught what the color picker would normally prevent. Same lesson as Activity 3, row E: **never trust the browser**. |
| D | No hex check + CSS in the color | The value is saved, and the "circle" becomes `style="background-color:red; position:fixed; inset:0;"`. It **covers the whole page** for that user. Pug escaped the quotes, but the **CSS itself** is valid, so the browser applies it. | Put the regex check back. Validating the **format** (exactly `#` + 6 hex digits) is what keeps user data from turning into CSS. Delete the bad row in the shell: `DELETE FROM colors WHERE hex NOT LIKE '#______';` |
| E | Delete another user's color | **First try:** nothing is deleted. The `AND user_id = ?` check makes `changes` 0, and the page just reloads. **After removing the check:** the other user's color **is deleted**. | Put `AND user_id = ?` back, along with both values in `.run(colorId, userId)`. **Lesson:** hiding a button isn't security. Every request that touches data must check **who owns it**. *(This bug is called an **Insecure Direct Object Reference**, or IDOR.)* |
| F | Restart while logged in | You're **logged out** and sent to `/login`. After logging back in, **all your colors are still there**. | Nothing to fix (see Q10). In production, sessions are stored in a database or a store like Redis, so they survive restarts. |

## Part 9 — Concept Check

**Q6.** A foreign key is a column that holds the **primary key of a row in another table**, linking the two rows. Here, it's **`colors.user_id`**, which references `users.user_id`.

**Q7.** **One** user can have **many** colors, but each color belongs to exactly **one** user. The "many" side (`colors`) holds the foreign key.

**Q8.** The URL would need the user ID and the name, with the space encoded: something like `/colors/1/Sky%20Blue/delete`. Names can contain spaces, slashes, `#`, and other symbols that are awkward in URLs. Renaming a color would also mean **changing its primary key**. With `color_id`, every color gets a short number that never changes (`/colors/7/delete`), and `UNIQUE (user_id, name)` still blocks duplicates.

**Q9.** On the **server**, in the session. The browser only keeps a **cookie** with a random session ID (by default it's named `connect.sid`). The cookie is like a coat-check ticket: it doesn't hold your data, it just lets the server find it. *(Students can see this cookie in DevTools → Application → Cookies.)*

**Q10.** **Sessions** are stored in the server's **memory**, which is erased when the process stops, just like the guestbook array in Activity 3. **Colors** are stored in `app.db` **on disk**, so they survive.

**Q11.** Anyone can send a `POST` request directly, without ever loading the page, using DevTools, `curl`, or a script. Without `requireLogin`, a POST would run with `req.session.userId` empty and fail with `NOT NULL constraint failed: colors.user_id`. Worse, it could change data. **Every** route that reads or changes private data needs the check.

## Part 10 — Level Up (sample solutions)

**🅰 Edit a color**

`models/colors.js` (add both functions to `module.exports`):
```javascript
// READ: get one color, only if this user owns it
function getColor(colorId, userId) {
  return db
    .prepare('SELECT color_id, name, hex, pantone FROM colors WHERE color_id = ? AND user_id = ?')
    .get(colorId, userId);
}

// UPDATE: change a color, only if this user owns it
function updateColor(colorId, userId, name, hex, pantone) {
  const result = db
    .prepare('UPDATE colors SET name = ?, hex = ?, pantone = ? WHERE color_id = ? AND user_id = ?')
    .run(name, hex, pantone || null, colorId, userId);
  return result.changes;
}
```

`views/edit-color.pug`:
```pug
extends layout

block content
  h2 Edit color
  form(action=`/colors/${colorId}/edit` method="POST")
    label(for="name") Color name
    input#name(type="text" name="name" value=values.name required)

    label(for="hex") Color
    input#hex(type="color" name="hex" value=values.hex)

    label(for="pantone") Pantone number (optional)
    input#pantone(type="text" name="pantone" value=values.pantone)

    button(type="submit") Save changes
  a(href="/colors") Cancel
```

In `colors.pug`, add a link inside each `li.color-card`, above the delete form:
```pug
          a(href=`/colors/${color.color_id}/edit`) Edit
```

`server.js`:
```javascript
app.get('/colors/:colorId/edit', requireLogin, (req, res) => {
  const color = colors.getColor(req.params.colorId, req.session.userId);
  if (!color) return res.status(404).send('Color not found');
  res.render('edit-color', { title: 'Edit color', errors: [], values: color, colorId: color.color_id });
});

app.post('/colors/:colorId/edit', requireLogin, (req, res) => {
  const colorId = req.params.colorId;
  const name = (req.body.name || '').trim();
  const hex = (req.body.hex || '').trim().toLowerCase();
  const pantone = (req.body.pantone || '').trim();

  const errors = [];
  if (!name) errors.push('Color name is required.');
  if (!/^#[0-9a-f]{6}$/.test(hex)) errors.push('Hex code must look like #1a2b3c.');
  if (pantone.length > 20) errors.push('Pantone number is too long.');

  if (errors.length === 0) {
    try {
      colors.updateColor(colorId, req.session.userId, name, hex, pantone);
      return res.redirect('/colors');
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        errors.push(`You already have a color named "${name}".`);
      } else {
        throw err;
      }
    }
  }

  res.status(400).render('edit-color', {
    title: 'Edit color', errors, values: { name, hex, pantone }, colorId
  });
});
```
**Check for:** `AND user_id = ?` in **both** `getColor` and `updateColor`; a 404 when the color isn't found or belongs to someone else; and the same validation as adding. *(Good discussion: the validation is now copied in two places. Strong students can move it into a `validateColor(name, hex, pantone)` function that returns the `errors` array.)*

**🅱 Sort A–Z properly**

With plain `ORDER BY name`, **`Blue` comes before `aqua`**, because SQLite compares character codes and every uppercase letter comes before every lowercase letter. The fix in `getColorsForUser`:
```sql
SELECT color_id, name, hex, pantone FROM colors WHERE user_id = ? ORDER BY name COLLATE NOCASE
```

**🅲 Members page**

`models/colors.js`:
```javascript
function getColorCounts() {
  return db
    .prepare(`SELECT users.first_name, COUNT(colors.color_id) AS total
              FROM users
              LEFT JOIN colors ON colors.user_id = users.user_id
              GROUP BY users.user_id
              ORDER BY total DESC`)
    .all();
}
```
`server.js`:
```javascript
app.get('/members', requireLogin, (req, res) => {
  res.render('members', { title: 'Members', members: colors.getColorCounts(), errors: [] });
});
```
`views/members.pug`:
```pug
extends layout

block content
  h2 Members
  ul
    each member in members
      li #{member.first_name}: #{member.total} colors
```
**Check for:** `LEFT JOIN`, not `JOIN`. With a plain `JOIN`, users who have **zero** colors disappear from the list. Use `COUNT(colors.color_id)`, not `COUNT(*)`: `COUNT(*)` would count a user with no colors as having 1.

**🅳 Delete my account**

`models/users.js` (add to `module.exports`):
```javascript
function deleteUser(userId) {
  return db.prepare('DELETE FROM users WHERE user_id = ?').run(userId).changes;
}
```
`server.js`:
```javascript
app.post('/account/delete', requireLogin, (req, res) => {
  users.deleteUser(req.session.userId);
  req.session.destroy(() => {
    res.redirect('/signup');
  });
});
```
`views/colors.pug` (at the bottom of `block content`):
```pug
  form(action="/account/delete" method="POST")
    button.delete(type="submit") Delete my account
```
Check in the shell: `SELECT * FROM colors WHERE user_id = <their id>;` returns **no rows**.

**Q12.** `ON DELETE CASCADE` on the `user_id` foreign key in the `colors` table. It only works because `database.js` turns on `foreign_keys = ON`. Without the pragma, the user would be deleted but their colors would stay behind as orphan rows.

## Instructor notes
- **Ada's login:** in Activity 4, Ada's email was updated to `ada.lovelace@example.com` (password `secret123`), and Alan was deleted. Students who reset `app.db` will need to **sign up** first. That works fine, since signup creates the `users` row.
- **The session secret** is hard-coded for simplicity. This is a good place to mention that real apps keep secrets in **environment variables** (`process.env.SESSION_SECRET`) and never commit them to Git.
- **Pantone numbers** are typed in by the user. The app doesn't check them against Pantone's catalog. The hex code is what actually draws the circle.
