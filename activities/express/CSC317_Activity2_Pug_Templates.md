# CSC 317 — Activity 2: Dynamic Pages with the Pug Template Engine

## Learning Objectives
By the end of this activity, you will be able to:
1. Explain what a template engine does and why you'd use one
2. Set up Pug as the view engine in Express
3. Pass data from a route to a template with `res.render()`
4. Use Pug variables, loops, conditionals, and layouts

## Before You Start
- [ ] You finished Activity 1, and `my-static-site` runs at `localhost:3000`
- [ ] Stop your server (`Ctrl + C`)

💡 **Big idea:** A static HTML file looks the same for every visitor. A **template** is HTML with blanks in it. Express fills in the blanks with data, then sends finished HTML to the browser.

---

## Part 1 — Install & Configure Pug (5 min)

**Step 1.** Install Pug:
```bash
npm install pug
```

**Step 2.** Create a `views/` folder. Your project should now look like this:
```
my-static-site/
├── public/
│   ├── css/style.css
│   └── ...
├── views/          ← NEW: Pug templates go here
├── package.json
└── server.js
```

**Step 3.** Rename `public/index.html` to `public/old-index.html`.

❓ **Q1.** *Predict: why might we need to do this? (You'll test it in Part 6.)*
______________________________________________

---

## Part 2 — Pug Syntax Crash Course (5 min)
Pug uses **indentation** in place of closing tags. Compare:

| HTML | Pug |
|---|---|
| `<h1>Hello</h1>` | `h1 Hello` |
| `<a href="/about">About</a>` | `a(href="/about") About` |
| `<p class="intro">Hi</p>` | `p.intro Hi` |
| `<div id="main"></div>` | `#main` |
| `<h1>` + a variable | `h1= title` |
| Variable inside text | `p Hello, #{name}!` |

⚠️ **Indentation matters!** Use spaces *or* tabs, never both in the same file.

❓ **Q2.** *Convert this to Pug:* `<ul><li>One</li><li>Two</li></ul>`
______________________________________________

---

## Part 3 — Create a Layout (10 min)
A **layout** holds the parts every page shares (head, header, nav, footer). Each page fills in only its own `block`.

**Step 4.** Create `views/layout.pug`:
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
      h1= title
      nav
        a(href="/") Home
        a(href="/topics") Topics
    main
      block content
    footer
      p © #{year} CSC 317
```

**Step 5.** Add this to `public/css/style.css`:
```css
nav a {
  margin-right: 1rem;
}
```

---

## Part 4 — Create Page Templates (10 min)

**Step 6.** Create `views/index.pug`:
```pug
extends layout

block content
  p= message
  p Welcome, #{student}!
```

**Step 7.** Create `views/topics.pug`:
```pug
extends layout

block content
  h2 What we've learned
  if topics.length
    ul
      each topic in topics
        li= topic
  else
    p No topics yet.
```

---

## Part 5 — Render Templates from Express (10 min)

**Step 8.** Update `server.js`:
```javascript
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// 1. Tell Express to use Pug, and where the templates live
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 2. Data available to EVERY template
app.locals.year = new Date().getFullYear();

// 3. Static files (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// 4. Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    message: 'This page was built by Pug!',
    student: 'Your Name Here'
  });
});

app.get('/topics', (req, res) => {
  res.render('topics', {
    title: 'Topics',
    topics: ['HTML', 'CSS', 'Node.js', 'Express', 'Pug']
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

**Step 9.** Run `node server.js` and visit both pages.

✅ **Checkpoint 2:** Both pages share the same header, nav, and footer. The Topics page shows a bulleted list. Show a neighbor.

**Step 10.** In your browser, right-click the page → **View Page Source**.

❓ **Q3.** *Do you see Pug or HTML? What does this tell you about where Pug runs?*
______________________________________________

---

## Part 6 — Break It & Fix It (10 min)
Try each change, restart the server if needed, write down what happens, then undo it.

| # | Change you make | What happened? | How you fixed it |
|---|---|---|---|
| A | Rename `old-index.html` back to `index.html`, restart, and visit `/` | | |
| B | In `index.pug`, add one extra space at the start of the `p= message` line | | |
| C | Remove `student` from the `res.render()` data for `/` | | |
| D | Change `res.render('topics', ...)` to `res.render('topic', ...)` | | |
| E | Set `topics: []` in the `/topics` route | | |

---

## Part 7 — Concept Check
Answer in 1–2 sentences.

**Q4.** What's the difference between serving `index.html` with `express.static()` and rendering `index.pug` with `res.render()`?
______________________________________________

**Q5.** What do `extends` and `block` do?
______________________________________________

**Q6.** When would you put data in `app.locals` instead of passing it to `res.render()`?
______________________________________________

**Q7.** Why does `res.render('index')` work without writing `views/index.pug`?
______________________________________________

---

## Part 8 — Level Up (choose at least one)
- **🅰 Your own data:** Add an `/about` route that passes an object (`{ name, major, hobbies: [...] }`) and displays it.
- **🅱 Partials:** Move the `nav` into `views/includes/nav.pug`, then pull it into the layout with `include includes/nav`.
- **🅲 Route parameters:** Create `/hello/:name` that greets whoever is in the URL:
  ```javascript
  app.get('/hello/:name', (req, res) => {
    res.render('index', { title: 'Hello', message: 'Hi there!', student: req.params.name });
  });
  ```
- **🅳 Pug 404:** Turn your `404.html` from Activity 1 into `404.pug` that extends the layout, then use `res.status(404).render('404', { title: 'Not Found' })`.

---

## Submission [OPTIONAL!]
- [ ] Screenshot of the Home page and the Topics page running at `localhost:3000`
- [ ] Screenshot of View Page Source for one page
- [ ] Completed Parts 6 and 7
- [ ] At least one Level Up challenge

---

## API Reference

### Express
| Method / Property | What it does | Example |
|---|---|---|
| `app.set(name, value)` | Stores an app setting. `'view engine'` picks the template engine, and `'views'` sets the template folder. | `app.set('view engine', 'pug');` |
| `app.locals` | An object whose properties are available in **every** template. | `app.locals.year = 2026;` |
| `res.render(view, [data])` | Turns a template into HTML using `data` and sends it. You can leave out the folder and `.pug` extension. | `res.render('index', { title: 'Home' });` |
| `req.params` | An object holding the named parts of the URL from route parameters (`:name`). | `/hello/ana` → `req.params.name === 'ana'` |

### Pug
| Syntax | What it does | Example |
|---|---|---|
| `tag= variable` | Puts a variable's value (HTML-escaped) inside a tag. | `h1= title` |
| `#{variable}` | Inserts a variable in the middle of text. | `p Hi, #{student}!` |
| `tag(attr="value")` | Adds attributes to a tag. | `a(href="/") Home` |
| `.class` / `#id` | Shorthand for class and id. A tag with no name becomes a `div`. | `p.intro` / `#main` |
| `extends file` | Uses another template as the page's layout. Must be the first line. | `extends layout` |
| `block name` | A named slot. A layout defines it, and pages fill it in. | `block content` |
| `include file` | Inserts another Pug file in place. | `include includes/nav` |
| `each item in list` | Loops over an array. | `each t in topics` |
| `if` / `else` | Shows content only when a condition is true. | `if topics.length` |

📘 **Full docs:** [pugjs.org](https://pugjs.org) · [expressjs.com/en/guide/using-template-engines.html](https://expressjs.com/en/guide/using-template-engines.html)

---

## Troubleshooting Cheat Sheet
| Problem | Likely cause |
|---|---|
| `Cannot find module 'pug'` | You skipped `npm install pug` |
| `Failed to lookup view "x" in views directory` | Typo in the filename, or the `views` setting points to the wrong folder |
| `/` shows the old static page | `public/index.html` still exists. Static middleware answers first |
| `Inconsistent indentation` | Spaces and tabs are mixed, or a line is indented the wrong amount |
| A variable shows as blank | You didn't pass it to `res.render()` or set it in `app.locals` |
| Page has no styling | The `link` path in `layout.pug` must start with `/css/` |

---
---

# 🔑 Answer Key

## Part 1 — Install & Configure

**Q1.** `express.static()` is added **before** the `/` route. A request for `/` makes static middleware look for `public/index.html`. If that file exists, Express sends it and the Pug route never runs. Renaming the file lets the request fall through to `app.get('/')`. *(Students confirm this in Part 6, row A.)*

## Part 2 — Pug Syntax

**Q2.**
```pug
ul
  li One
  li Two
```

## Part 5 — Render Templates

**Q3.** The source shows **plain HTML**, with no Pug syntax at all. Pug runs **on the server**: Express turns the template into HTML before sending it, so the browser never sees the template.

## Part 6 — Break It & Fix It

| # | Change | What happened | Fix |
|---|---|---|---|
| A | Restore `public/index.html` | `/` shows the **old static page**, not the Pug page. `/topics` still works. `express.static()` comes first and sends `index.html` for `/`, so `app.get('/')` never runs. | Rename the file again (or delete it). **Other options:** move `app.use(express.static(...))` below the routes, or use `express.static(path, { index: false })`. |
| B | Extra space before `p= message` | The page shows an error: `Inconsistent indentation. Expecting either 0 or 3 spaces/tabs.` The next line has 2 spaces, so Pug can't tell how the lines are nested. | Line up all children of `block content` at the same indentation. **Discussion:** if you add the extra space to the *second* `p` instead, there's no error. Pug nests that paragraph *inside* the first one (`<p>…<p>Welcome…</p></p>`). Check it with View Page Source. |
| C | Remove `student` | No error. The page shows `Welcome, !`, because a missing variable renders as an empty string. | Add `student` back to the data object. *(Point out that silent blanks are harder to debug than errors.)* |
| D | `res.render('topic', ...)` | `/topics` shows an error: `Failed to lookup view "topic" in views directory ".../views"`. | Match the name to the file: `'topics'` for `topics.pug`. |
| E | `topics: []` | The page shows **"No topics yet."** An empty array has `length` 0, which is falsy, so the `else` branch runs. | Nothing to fix. This shows the `if` / `else` working. |

## Part 7 — Concept Check

**Q4.** `express.static()` sends a file from disk **exactly as written**, so every visitor gets the same page. `res.render()` **builds HTML at request time** by filling a template with data, so the page can change based on the data, the URL, or the user.

**Q5.** `extends layout` tells Pug to use `layout.pug` as the page's frame. A `block` is a named slot: the layout defines `block content`, and each page puts its own content in that slot. This keeps shared HTML (head, nav, footer) in one place.

**Q6.** Use `app.locals` for data **every** page needs that doesn't change per request, like the year, the site name, or the course number. Use `res.render()` data for things that belong to **one page or request**, like the page title or a list of topics.

**Q7.** The `views` setting tells Express which folder to look in, and the `view engine` setting tells it to add `.pug`. So `res.render('index')` becomes `views/index.pug`.

## Part 8 — Level Up (sample solutions)

**🅰 Your own data**

`server.js`:
```javascript
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    person: {
      name: 'Ana Lopez',
      major: 'Computer Science',
      hobbies: ['Hiking', 'Guitar', 'Coffee']
    }
  });
});
```
`views/about.pug`:
```pug
extends layout

block content
  h2= person.name
  p Major: #{person.major}
  h3 Hobbies
  ul
    each hobby in person.hobbies
      li= hobby
```

**🅱 Partials**

`views/includes/nav.pug`:
```pug
nav
  a(href="/") Home
  a(href="/topics") Topics
```
In `views/layout.pug`, replace the `nav` block with one line, indented under `header`:
```pug
    header
      h1= title
      include includes/nav
```
**Check for:** the `include` path is relative to `layout.pug` and leaves out `.pug`.

**🅲 Route parameters:** Visiting `/hello/Maria` shows `Welcome, Maria!`. The `:name` part of the URL arrives in `req.params.name`. Pug escapes `#{}` output, so a name like `<script>` is shown as text and never runs. That makes a good security discussion.

**🅳 Pug 404**

`views/404.pug`:
```pug
extends layout

block content
  h2 Page not found
  p Sorry, that page doesn't exist.
  a(href="/") Go home
```
In `server.js`, after all routes and before `app.listen()`:
```javascript
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found' });
});
```
**Check for:** the handler comes **last**, the same rule as in Activity 1.

## Complete `server.js` (core activity)
```javascript
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.locals.year = new Date().getFullYear();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    message: 'This page was built by Pug!',
    student: 'Your Name Here'
  });
});

app.get('/topics', (req, res) => {
  res.render('topics', {
    title: 'Topics',
    topics: ['HTML', 'CSS', 'Node.js', 'Express', 'Pug']
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```
