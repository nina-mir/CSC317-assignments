# REST Colors Mini-API (Express) — Activity Sheet

*This activity WILL appear on your midterm and quizzes.*

## Learning Goals

* Practice **HTTP verbs**: `GET`, `POST`, `DELETE`, `HEAD`
* Implement a tiny **REST API** with **Express (CommonJS)** + `express.json()`
* Handle **validation**, **normalization**, and **proper status codes**
* Test with **Postman** and **curl**
* Use **nodemon** for a smoother dev loop
* Manage **in-memory state** (resets on restart)

---

## API Contract (what your server must do)

| Method | Path     | Purpose                            | Request Body                             | Responses (status → body/headers)                                                            |
| -----: | -------- | ---------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------- |
|    GET | `/`      | Get **all** colors                 | —                                        | `200` → `[{ name, hex }, ...]`                                                               |
|   HEAD | `/`      | Get **count** of colors via header | —                                        | `200` + header `X-Color-Count: N`                                                            |
|    GET | `/:name` | Get **one color by name**          | —                                        | `200` → `{ name, hex }` or `404` → `{ "error": "not found" }`                                |
|   POST | `/add`   | **Add** a color                    | `{ "name": "purple", "hex": "#800080" }` | `201` → `{ name, hex }` (normalized) · `400` → `{ "error": "message" }` · `409` on duplicate |
| DELETE | `/:name` | **Delete** a color by name         | —                                        | `204` (no body) or `404` → `{ "error": "not found" }`                                        |

**Normalization rules**

* Store and compare **names in lowercase** (`"Red"` → `"red"`).
* Normalize hex to **lowercase with a leading `#`** and exactly **6 hex digits** (`"#Ff0000"` or `"ff0000"` → `"#ff0000"`).
* Validation regex (accepts with or without `#` before normalization): `/^#?[0-9a-fA-F]{6}$/`.

**Duplicates**

* **409 Conflict** if a color with the **same normalized name** already exists.

---

## Setup (Guided)

### Step 1 — Initialize the project

**Do:** create a folder (e.g., `colors-api`) and initialize npm.

**Hint:** Use `npm init -y` to skip questions.

**Answer:**

```bash
mkdir colors-api && cd colors-api
npm init -y
```

---

### Step 2 — Install dependencies

**Do:** install Express and nodemon (dev).

**Hint:** You only need `express`. `nodemon` should be `-D`.

**Answer:**

```bash
npm i express
npm i -D nodemon
```

---

### Step 3 — Add scripts to `package.json`

**Do:** add a start script with Node and a dev script with nodemon.

**Hint:** File will be `server.js`.

**Answer (package.json excerpt):**

```json
{
  "type": "commonjs",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

### Step 4 — Create `server.js` skeleton

**Do:** Require express, create `app`, add `express.json()`, choose a port, and start listening.

**Hint:** Remember `app.use(express.json())` for parsing JSON bodies.

**Answer (`server.js` skeleton):**

```js
'use strict';
const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// In-memory state
/** @type {{name:string, hex:string}[]} */
const colors = [
  { name: 'red',   hex: '#ff0000' },
  { name: 'green', hex: '#00ff00' },
  { name: 'blue',  hex: '#0000ff' }
];

// TODO: routes go here...

app.listen(PORT, () => {
  console.log(`Colors API listening on http://localhost:${PORT}`);
});
```

---

### Step 5 — Helpers: validate & normalize

**Do:** Implement small utility functions to:

* check hex format,
* normalize hex to `#rrggbb` (lowercase),
* normalize name to lowercase,
* find index by name.

**Hint:** Keep helpers pure and small.

**Answer (add above routes):**

```js
const HEX_RE = /^#?[0-9a-fA-F]{6}$/;

function isValidHex(input) {
  return typeof input === 'string' && HEX_RE.test(input);
}

function normalizeHex(input) {
  const raw = input.startsWith('#') ? input.slice(1) : input;
  return `#${raw.toLowerCase()}`;
}

function normalizeName(name) {
  return String(name || '').toLowerCase().trim();
}

function findIndexByName(name) {
  const n = normalizeName(name);
  return colors.findIndex(c => c.name === n);
}
```

---

### Step 6 — `GET /` (all colors)

**Do:** Return the full array as JSON.

**Hint:** Status 200 and a JSON array.

**Answer:**

```js
app.get('/', (req, res) => {
  res.status(200).json(colors);
});
```

---

### Step 7 — `HEAD /` (count via header)

**Do:** Send `X-Color-Count` header with the array length. No body.

**Hint:** Use `res.set()` then `res.sendStatus(200)`.

**Answer:**

```js
app.head('/', (req, res) => {
  res.set('X-Color-Count', String(colors.length));
  res.sendStatus(200);
});
```

---

### Step 8 — `GET /:name` (single color)

**Do:** Look up a color by **lowercased** name. Return `200` with the object or `404` with `{ "error": "not found" }`.

**Hint:** Use `findIndexByName`.

**Answer:**

```js
app.get('/:name', (req, res) => {
  const idx = findIndexByName(req.params.name);
  if (idx === -1) {
    return res.status(404).json({ error: 'not found' });
  }
  res.status(200).json(colors[idx]);
});
```

---

### Step 9 — `POST /add` (create a color)

**Do:** Body must include `name` and `hex`.
Normalize: `name` → lowercase; `hex` → `#rrggbb`.
Errors:

* `400` if missing fields or invalid hex;
* `409` if duplicate name (after normalization).
  Success:
* `201` with created `{ name, hex }`.

**Hint:** Validate first; check duplicates with `findIndexByName`.

**Answer:**

```js
app.post('/add', (req, res) => {
  const { name, hex } = req.body || {};

  const nName = normalizeName(name);
  if (!nName) {
    return res.status(400).json({ error: 'name is required' });
  }

  if (!isValidHex(hex)) {
    return res.status(400).json({ error: 'hex must be 6 hex digits, with or without leading #' });
  }

  if (findIndexByName(nName) !== -1) {
    return res.status(409).json({ error: 'color already exists' });
  }

  const nHex = normalizeHex(hex);
  const created = { name: nName, hex: nHex };
  colors.push(created);
  return res.status(201).json(created);
});
```

---

### Step 10 — `DELETE /:name` (remove a color)

**Do:** Delete by name (lowercased compare).
Responses: `204` on success, `404` with `{ "error": "not found" }` if absent.

**Hint:** Use `splice` after index check.

**Answer:**

```js
app.delete('/:name', (req, res) => {
  const idx = findIndexByName(req.params.name);
  if (idx === -1) {
    return res.status(404).json({ error: 'not found' });
  }
  colors.splice(idx, 1);
  return res.sendStatus(204);
});
```

---

### Step 11 — Run with nodemon

**Do:** Start in dev mode and keep the server auto-reloading.

**Hint:** Use the script from Step 3.

**Answer:**

```bash
npm run dev
# Open another terminal for curl tests
```

---

## Testing Guide (Postman & curl)

### A. `GET /`

* **Postman:** GET → `http://localhost:3000/`
* **curl:**

```bash
curl -i http://localhost:3000/
```

**Expected:** `200` + JSON array (initial 3 colors).

---

### B. `HEAD /`

* **Postman:** HEAD → `http://localhost:3000/`
* **curl:**

```bash
curl -I http://localhost:3000/
```

**Expected:** `200` + header `X-Color-Count: 3` (or current count), **no body**.

---

### C. `GET /blue`

```bash
curl -i http://localhost:3000/blue
```

**Expected:** `200` with `{"name":"blue","hex":"#0000ff"}`.
*Case-insensitive lookup test:*

```bash
curl -i http://localhost:3000/BluE
```

**Expected:** still `200` with the same body.

---

### D. `POST /add` (valid)

```bash
curl -i -X POST http://localhost:3000/add \
  -H "Content-Type: application/json" \
  -d '{"name":"Purple","hex":"800080"}'
```

**Expected:** `201` with `{"name":"purple","hex":"#800080"}` (normalized).

---

### E. `POST /add` (duplicate)

```bash
curl -i -X POST http://localhost:3000/add \
  -H "Content-Type: application/json" \
  -d '{"name":"purple","hex":"#800080"}'
```

**Expected:** `409` with `{"error":"color already exists"}`.

---

### F. `POST /add` (invalid hex)

```bash
curl -i -X POST http://localhost:3000/add \
  -H "Content-Type: application/json" \
  -d '{"name":"teal","hex":"#12Z"}'
```

**Expected:** `400` with `{"error":"hex must be 6 hex digits, with or without leading #"}`.

---

### G. `DELETE /purple`

```bash
curl -i -X DELETE http://localhost:3000/purple
```

**Expected:** `204` (no body).
*Deleting again should produce:*

```bash
curl -i -X DELETE http://localhost:3000/purple
```

**Expected:** `404` with `{"error":"not found"}`.

---

## Grading Checklist (self/peer check)

* [ ] Uses **CommonJS** (`require`, not `import`)
* [ ] `express.json()` middleware enabled
* [ ] **All routes** implemented: `GET /`, `HEAD /`, `GET /:name`, `POST /add`, `DELETE /:name`
* [ ] **Normalization**: names to lowercase; hex to `#rrggbb` lowercase
* [ ] **Validation**: rejects bad hex; meaningful `400` error messages
* [ ] **Duplicate handling**: `409 Conflict` on existing name
* [ ] **Status codes**: `200`, `201`, `204`, `400`, `404`, `409` used correctly
* [ ] **HEAD** returns **header** `X-Color-Count` with correct number
* [ ] Works with **curl/Postman** examples above
* [ ] In-memory state note acknowledged (resets on restart)
* [ ] `nodemon` dev flow functional

---

## Optional Stretch (not graded, recommended)

* Add basic request logging using `morgan`
* Add `GET /health` returning `{ status: "ok" }`
* Add simple rate-limit (e.g., naïve counter) or input length limits
* Add ETag on `GET /` to mention caching (advanced)

---

## Full Reference Implementation (for instructors / answer key)

> You should already have this from the step-by-step answers above. Here’s the complete file to compare against your work.

```js
'use strict';
const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// In-memory state
/** @type {{name:string, hex:string}[]} */
const colors = [
  { name: 'red',   hex: '#ff0000' },
  { name: 'green', hex: '#00ff00' },
  { name: 'blue',  hex: '#0000ff' }
];

// Helpers
const HEX_RE = /^#?[0-9a-fA-F]{6}$/;

function isValidHex(input) {
  return typeof input === 'string' && HEX_RE.test(input);
}

function normalizeHex(input) {
  const raw = input.startsWith('#') ? input.slice(1) : input;
  return `#${raw.toLowerCase()}`;
}

function normalizeName(name) {
  return String(name || '').toLowerCase().trim();
}

function findIndexByName(name) {
  const n = normalizeName(name);
  return colors.findIndex(c => c.name === n);
}

// Routes
app.get('/', (req, res) => {
  res.status(200).json(colors);
});

app.head('/', (req, res) => {
  res.set('X-Color-Count', String(colors.length));
  res.sendStatus(200);
});

app.get('/:name', (req, res) => {
  const idx = findIndexByName(req.params.name);
  if (idx === -1) {
    return res.status(404).json({ error: 'not found' });
  }
  res.status(200).json(colors[idx]);
});

app.post('/add', (req, res) => {
  const { name, hex } = req.body || {};

  const nName = normalizeName(name);
  if (!nName) {
    return res.status(400).json({ error: 'name is required' });
  }

  if (!isValidHex(hex)) {
    return res.status(400).json({ error: 'hex must be 6 hex digits, with or without leading #' });
  }

  if (findIndexByName(nName) !== -1) {
    return res.status(409).json({ error: 'color already exists' });
  }

  const nHex = normalizeHex(hex);
  const created = { name: nName, hex: nHex };
  colors.push(created);
  return res.status(201).json(created);
});

app.delete('/:name', (req, res) => {
  const idx = findIndexByName(req.params.name);
  if (idx === -1) {
    return res.status(404).json({ error: 'not found' });
  }
  colors.splice(idx, 1);
  return res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Colors API listening on http://localhost:${PORT}`);
});
```

---

## Developer Ergonomics Tips

* Use `npm run dev` during development.
* When testing `HEAD /` in Postman, enable the *Headers* tab—bodies are intentionally empty.
* Keep Postman or curl commands in a `tests.sh` file to re-run quickly.
* Commit often; add a `.gitignore` (`node_modules/`, `.env`) even if you’re not using a database yet.

Viel Erfolg — you’ve built a tidy, testable mini-API that teaches real-world HTTP patterns. 🎨🧪
