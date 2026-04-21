# CSC 317 — Mid-Term 2 — Spring 2026 — Answer Key

---

## Question 1 — `fs` Module (10 pts)

```javascript
'use strict';
const fs = require('fs');
const path = require('path');

const DIR_NAME = 'mid-term-2';
const FILE_COUNT = 5;

// 1. Create the directory (handle the case where it already exists)
fs.mkdirSync(DIR_NAME, { recursive: true });

// 2. Create 5 files inside the directory, each containing "mid-term-2"
for (let i = 1; i <= FILE_COUNT; i++) {
  const filePath = path.join(DIR_NAME, `file-${i}.txt`);
  fs.writeFileSync(filePath, 'mid-term-2');
}
```

### Also accept: async/callback version

```javascript
const fs = require('fs');
const path = require('path');

const DIR_NAME = 'mid-term-2';
const FILE_COUNT = 5;

fs.mkdir(DIR_NAME, { recursive: true }, (err) => {
  if (err) throw err;
  for (let i = 1; i <= FILE_COUNT; i++) {
    const filePath = path.join(DIR_NAME, `file-${i}.txt`);
    fs.writeFile(filePath, 'mid-term-2', (err) => {
      if (err) throw err;
    });
  }
});
```

### Grading Notes

- 4 pts for `fs.mkdirSync` (or `fs.mkdir`) with `{ recursive: true }`.
- 4 pts for a correct loop creating 5 files with the right names (`file-1.txt` through `file-5.txt`).
- 2 pts for using `path.join()` and writing `'mid-term-2'` as the file content.
- Deduct 1 pt if they hardcode all 5 calls instead of using a loop (still technically correct, but not great practice).
- Accept either sync or async — either is fine as long as it's consistent.

---

## Question 2 — `os` Module (10 pts)

```javascript
'use strict';
const os = require('os');

// 1. Print hostname, home directory, and temp directory
console.log('Hostname:', os.hostname());
console.log('Home dir:', os.homedir());
console.log('Temp dir:', os.tmpdir());

// 2. Every 2 seconds, log: uptime, free memory, total memory, CPU core count
const intervalId = setInterval(() => {
  console.log('Uptime (s):', os.uptime());
  console.log('Free memory:', os.freemem());
  console.log('Total memory:', os.totalmem());
  console.log('CPU cores:', os.cpus().length);
  console.log();
}, 2000);

// 3. Stop the script after 10 seconds
setTimeout(() => {
  clearInterval(intervalId);
  process.exit();
}, 10000);
```

### Grading Notes

- 3 pts for correctly printing hostname, homedir, and tmpdir using `os.hostname()`, `os.homedir()`, `os.tmpdir()`.
- 4 pts for `setInterval` with 2000ms logging all four values. Deduct 1 pt if they forget `os.cpus().length` (writing `os.cpus()` alone dumps the full array, not the count).
- 3 pts for `setTimeout` with 10000ms that stops the script. Accept `process.exit()` alone, `clearInterval` + `process.exit()`, or `clearInterval` by itself (all stop the repeating output).

---

## Question 3 — Pug Template for 404 (10 pts)

### Part (a) — `views/404.pug` — 5 pts

```pug
html
  head
    title 404 - Color Not Found
  body
    h1 404 — Color Not Found
    p The color "#{colorName}" does not exist.
```

#### Also accept: minimal version

```pug
h1 404 — Color Not Found
p The color "#{colorName}" does not exist.
```

#### Grading Notes

- 2 pts for an `h1` with a 404 heading.
- 3 pts for a `p` tag that dynamically inserts the color name using Pug interpolation (`#{colorName}` or `#{name}` — whatever variable name they use, as long as it matches part (b)).
- Accept any reasonable variable name. The key is that it's dynamic, not hardcoded.
- Accept with or without `html`/`head`/`body` wrapper — both are valid Pug.

### Part (b) — Updated route handler — 5 pts

```javascript
if (!color) {
  return res.status(404).render('404', { colorName: req.params.name });
}
```

#### Full route for context:

```javascript
app.get('/colors/:name', (req, res) => {
  const color = findColorByName(req.params.name);
  if (!color) {
    return res.status(404).render('404', { colorName: req.params.name });
  }
  res.render('color-detail', { color });
});
```

#### Grading Notes

- 2 pts for using `res.render('404', ...)` instead of `res.send(...)`.
- 2 pts for passing the color name to the template (e.g., `{ colorName: req.params.name }`). The variable name must match what they used in part (a).
- 1 pt for keeping `res.status(404)` chained before `.render()`.
- Deduct 2 pts if they use `res.render` but forget to pass any data (the template can't display the color name dynamically).
- Deduct 1 pt if they drop `status(404)` — the response would default to 200, which is incorrect for a not-found error.