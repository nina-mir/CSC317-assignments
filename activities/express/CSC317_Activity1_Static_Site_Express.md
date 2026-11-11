# CSC 317 — Activity: Serving a Static Website with Node.js & Express


## Learning Objectives
By the end of this activity, you will be able to:
1. Set up a new Node.js project with `npm`
2. Install and import the Express framework
3. Organize a static site (HTML, CSS, images) in a `public/` folder
4. Serve that site locally with `express.static()`
5. Find and fix common errors (port in use, 404s, broken CSS links)

## Before You Start
- [ ] Node.js is installed. Check it by running `node -v` and `npm -v` in your terminal.
- [ ] You have a code editor (VS Code recommended).
- [ ] You know how to open a terminal in a folder.

---

## Part 1 — Create the Project (10 min)

**Step 1.** Make a project folder and move into it:
```bash
mkdir my-static-site
cd my-static-site
```

**Step 2.** Start a Node project:
```bash
npm init -y
```
❓ **Q1.** *What new file appeared? What do you think it's for?*
______________________________________________

**Step 3.** Install Express:
```bash
npm install express
```
❓ **Q2.** *Two new things appeared in your folder. Name them:*
1. ____________________ 2. ____________________

---

## Part 2 — Build the Static Site (10 min)

**Step 4.** Create this folder structure:
```
my-static-site/
├── node_modules/
├── public/
│   ├── index.html
│   ├── about.html
│   ├── css/
│   │   └── style.css
│   └── images/
├── package.json
└── server.js
```

**Step 5.** Add this to `public/index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Static Site</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <header>
    <h1>Hello from Express!</h1>
    <nav>
      <a href="/">Home</a> | <a href="/about.html">About</a>
    </nav>
  </header>
  <main>
    <p>This page is being served by a Node.js server.</p>
  </main>
</body>
</html>
```

**Step 6.** Add this to `public/css/style.css`:
```css
body {
  font-family: system-ui, sans-serif;
  max-width: 700px;
  margin: 2rem auto;
  padding: 0 1rem;
  background: #f7f5ff;
  color: #222;
}

header {
  border-bottom: 3px solid #4b2e83;
  margin-bottom: 1rem;
}

a {
  color: #4b2e83;
}
```

**Step 7.** Write your own `about.html` page. It must link to the same stylesheet and include a link back to Home.

---

## Part 3 — Write the Server (10 min)

**Step 8.** Add this to `server.js`:
```javascript
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve every file inside the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

**Step 9.** Start the server:
```bash
node server.js
```

**Step 10.** Open **http://localhost:3000** in your browser.

✅ **Checkpoint 1:** Your page loads *with styling*, and the About link works. Raise your hand or show a neighbor.

---

## Part 4 — Concept Check
Answer in 1–2 sentences.

**Q3.** What does `express.static()` do?
______________________________________________

**Q4.** Why does the CSS link start with `/css/...` and not `/public/css/...`?
______________________________________________

**Q5.** What is `__dirname`, and why do we use `path.join()` with it?
______________________________________________

**Q6.** What happens if you visit `http://localhost:3000/nope.html`? Why?
______________________________________________

**Q7.** Why shouldn't `node_modules/` be uploaded to GitHub?
______________________________________________

---

## Part 5 — Break It & Fix It (10 min)
Try each change, write down what happens, then undo it.

| # | Change you make | What happened? | How you fixed it |
|---|---|---|---|
| A | Rename `public/` to `site/` (don't edit `server.js`) | | |
| B | Change the CSS link to `href="css/styles.css"` | | |
| C | Run `node server.js` in two terminals at once | | |
| D | Edit `index.html` while the server is running, then refresh | | |

---

## Part 6 — Level Up (choose at least one)
- **🅰 npm script:** Add `"start": "node server.js"` to the `scripts` section of `package.json`, then run `npm start`.
- **🅱 Auto-restart:** Run `node --watch server.js`. Edit `server.js` and watch the server restart on its own.
- **🅲 Custom 404:** Add a `404.html` page and send it for unknown routes:
  ```javascript
  app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  });
  ```
  ❓ **Q8.** *Why must this go **after** `express.static()`?*
  ______________________________________________
- **🅳 Bring your own:** Replace the sample pages with an HTML/CSS project from earlier in the semester.

---

## Submission
- [ ] Screenshot of your site running at `localhost:3000`
- [ ] Screenshot of your terminal showing the "Server running" message
- [ ] Completed Parts 4 and 5
- [ ] *(Optional)* Push to GitHub with a `.gitignore` containing `node_modules/`

---

## API Reference
The Express and Node methods used in this activity.

### Express
| Method | What it does | Example |
|---|---|---|
| `express()` | Creates a new Express application, usually stored in a variable named `app`. | `const app = express();` |
| `express.static(root)` | Built-in middleware that serves files (HTML, CSS, images, JS) straight from the `root` folder. The folder name does **not** appear in the URL. | `express.static(path.join(__dirname, 'public'))` |
| `app.use([path], middleware)` | Adds middleware that runs on every request, or only on requests matching `path`. Middleware runs **in the order you add it**. | `app.use(express.static('public'));` |
| `app.get(path, handler)` | Defines a route that responds to HTTP GET requests at `path`. | `app.get('/hello', (req, res) => res.send('Hi!'));` |
| `app.listen(port, [callback])` | Starts the server on `port`. The callback runs once the server is ready. | `app.listen(3000, () => console.log('Ready'));` |

### Response (`res`) methods
| Method | What it does | Example |
|---|---|---|
| `res.send(body)` | Sends a response (text, HTML, or an object) and ends the request. | `res.send('<h1>Hello</h1>');` |
| `res.sendFile(absPath)` | Sends a file. The path must be **absolute**, which is why we use `path.join(__dirname, ...)`. | `res.sendFile(path.join(__dirname, 'public', '404.html'));` |
| `res.status(code)` | Sets the HTTP status code. Returns `res`, so you can chain another method after it. | `res.status(404).send('Not found');` |

### Node.js
| Item | What it does | Example |
|---|---|---|
| `require(module)` | Imports a module, either built-in (`path`) or installed with npm (`express`). | `const express = require('express');` |
| `path.join(...parts)` | Joins pieces of a file path using the right separator for your operating system (`/` or `\`). | `path.join(__dirname, 'public')` |
| `__dirname` | The absolute path of the folder containing the current file. | `/Users/you/my-static-site` |

📘 **Full docs:** [expressjs.com/en/api.html](https://expressjs.com/en/api.html)

✍️ **Q9. Quick check:** Using the tables above, write one line of code that sends the text `"Server is up"` when someone visits `/status`.
______________________________________________

---

## Troubleshooting Cheat Sheet
| Problem | Likely cause |
|---|---|
| `Cannot find module 'express'` | You skipped `npm install express`, or you're in the wrong folder |
| `EADDRINUSE: port 3000` | Another server is already running. Press `Ctrl + C` in that terminal, or change `PORT` |
| Page loads but has no styling | Wrong CSS path. Check the browser DevTools → Network tab |
| `Cannot GET /` | There's no `index.html` in `public/`, or the folder name is wrong |

---
---

# 🔑 Answer Key

## Part 1 — Create the Project

**Q1.** `package.json`. It describes the project: its name, version, scripts, and the packages (dependencies) it needs. Anyone can run `npm install` to recreate the project's dependencies from it.

**Q2.**
1. `node_modules/`: the folder holding Express and all the packages Express depends on.
2. `package-lock.json`: records the exact version of every installed package, so every machine installs the same versions.

*(Also accept: `package.json` now lists `"express"` under `"dependencies"`.)*

## Part 2 — Step 7 (sample `about.html`)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <header>
    <h1>About Me</h1>
    <nav>
      <a href="/">Home</a> | <a href="/about.html">About</a>
    </nav>
  </header>
  <main>
    <p>I'm a CSC 317 student learning Node.js and Express.</p>
  </main>
</body>
</html>
```
**Check for:** the same `<link>` to `/css/style.css` and a working link back to `/`.

## Part 4 — Concept Check

**Q3.** `express.static()` is built-in middleware that serves files straight from a folder. When a request URL matches a file in that folder, Express sends the file as is, with no route code needed. A request for `/` sends `index.html` by default.

**Q4.** `express.static()` treats `public/` as the **root** of the site, so the folder name never appears in the URL. A request for `/css/style.css` maps to `public/css/style.css` on disk. A link to `/public/css/style.css` would look for `public/public/css/style.css` and return a 404.

**Q5.** `__dirname` is the absolute path of the folder containing the current file (`server.js`). `path.join()` combines it with `'public'` using the correct separator for the operating system. Together they always point to the right folder, even if you start the server from a different directory.

**Q6.** The browser shows `Cannot GET /nope.html` with a **404 Not Found** status. No file by that name exists in `public/` and no route matches, so Express's default "not found" handler responds.

**Q7.** `node_modules/` is very large and can be rebuilt anytime with `npm install` from `package.json` and `package-lock.json`. Some packages also contain files built for one operating system. Add it to `.gitignore`.

## Part 5 — Break It & Fix It

| # | Change | What happened | Fix |
|---|---|---|---|
| A | Rename `public/` → `site/` | The server still starts, but every page shows `Cannot GET /` (404). `express.static()` points to a folder that no longer exists. | Rename the folder back, **or** change `'public'` to `'site'` in `server.js` and restart. |
| B | CSS link → `css/styles.css` | The page loads but has **no styling**. DevTools → Network shows a 404 for `styles.css`. | Fix the filename (`style.css`). Keep the leading `/`, because without it the path is relative and breaks on pages in subfolders. |
| C | Two servers at once | The second terminal crashes with `Error: listen EADDRINUSE: address already in use :::3000`. Only one program can use a port at a time. | Stop one server with `Ctrl + C`, or change `PORT` in the second one (e.g., `3001`). |
| D | Edit `index.html`, then refresh | The change shows up **right away** with no restart. `express.static()` reads the file from disk on every request. | Nothing to fix. Point out that changes to **`server.js`** *do* need a restart (or `node --watch`). If the change doesn't appear, do a hard refresh (`Ctrl + Shift + R` / `Cmd + Shift + R`) to skip the browser cache. |

## Part 6 — Level Up

**🅰 npm script:** `package.json` should contain:
```json
"scripts": {
  "start": "node server.js"
}
```

**🅱 Auto-restart:** Saving `server.js` should print a restart message and run the server again automatically.

**🅲 Q8.** Express runs middleware **in the order it's added**. The 404 handler catches *every* request that reaches it. If it came first, it would answer every request with the 404 page, including requests for real files like `index.html`. Placed last, it only runs when nothing earlier, including `express.static()`, has sent a response.

Full `server.js` with the 404 handler:
```javascript
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Must come last: only runs if nothing above sent a response
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

## API Reference — Quick Check

**Q9.**
```javascript
app.get('/status', (req, res) => res.send('Server is up'));
```
**Check for:** `app.get` (not `app.use`), the path `'/status'`, and `res.send`. The line must come **before** `app.listen()` and before any 404 handler.
