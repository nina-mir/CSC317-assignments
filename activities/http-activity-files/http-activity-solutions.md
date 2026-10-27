# Exploring HTTP — Solutions and Self-Study Guide

Use this guide to check your answers and finish any activity steps you did not complete in class. Try each step in `http-activity.md` before reading its solution. The code samples show one valid approach; yours may look different and still be correct.

## Part A — Native Node.js

### Step 1 — Solution and observations

The starter code in the student sheet is complete.

1. Browser navigation uses **GET**.
2. **200 OK**, visible in DevTools Network → request details → status code (also via `response.status` in `fetch`).
3. The code explicitly sets **response** `Content-Type`. A browser request may also include a `Content-Type` in other scenarios, but a normal navigation usually does not need one.

### Step 2 — Solution and observations

Change the original handler to:

```js
const http = require('node:http');
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html'); // change to text/plain to compare
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Class-Activity', 'http-lab');
  res.end('<h1>Hello HTTP!</h1>');
});
server.listen(3000, () => console.log('http://localhost:3000'));
```

1. With `text/plain`, angle brackets appear as literal text; with `text/html`, the browser renders a heading.
2. The **server** sends `X-Class-Activity` as a response header.
3. `no-store` tells caches not to store the request or response for reuse.

### Step 3 — Complete native server with status codes, redirects, headers, and POST body

**This is the final version of `native-server.js` and also covers Steps 4–6.**

```js
const http = require('node:http');

const server = http.createServer((req, res) => {
  console.log('Method:', req.method);
  console.log('Path:', req.url);
  console.log('Accept:', req.headers['accept']);
  console.log('User-Agent:', req.headers['user-agent']);
  console.log('All headers:', req.headers);

  if (req.method === 'POST' && req.url === '/echo') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      console.log('Received body:', body);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ received: body }));
    });
    return;
  }

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Class-Activity', 'http-lab');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Welcome');
  } else if (req.url === '/missing') {
    res.statusCode = 404;
    res.end('Page not found');
  } else if (req.url === '/error') {
    res.statusCode = 500;
    res.end('Example server error');
  } else if (req.url === '/redirect') {
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  } else {
    res.statusCode = 404;
    res.end('Unknown path');
  }
});

server.listen(3000, () => console.log('http://localhost:3000'));
```

**Step 3 answers:**

1. No. `404` means a server responded but could not find the requested resource (or chose to report that it was not found).
2. `/redirect` sends a `302` response and the browser navigates to `/`; a Network log can show the `302` and then `200`.
3. `302` signals redirection; `Location: /` supplies the destination.

**Step 4 answers:**

1. The **client** (typically the browser) sends `User-Agent` information.
2. `Accept` identifies response media types the client is prepared to accept.
3. `req.headers` contains incoming **request** headers.

### Step 5 — Expected behavior

The console `fetch()` examples run from a page on `localhost:3000`. All methods can be sent. For this simple server, the non-POST `/echo` methods are not implemented separately and will often receive the same path-based response. That is deliberate: HTTP methods do not themselves implement application behavior.

1. `req.method`.
2. No. Deletion requires server-side logic.
3. Typing an address in the browser navigation bar sends a GET; `fetch()` permits other methods.

### Step 6 — Expected behavior

For the provided POST example, the native `/echo` route responds with **200**, response header `Content-Type: application/json`, and a body similar to:

```json
{"received":"{\"name\":\"Alex\",\"course\":\"Web Development\"}"}
```

This is a JSON object whose `received` field contains the original JSON **string** (not a parsed object). Parsing could be a later extension.

1. The **request** header is visible in DevTools → Request Headers and tells the server the media type of the submitted body.
2. The **response** header is visible in DevTools → Response Headers and describes the type of the returned body.
3. Native `http` exposes request body data as a stream; there is no built-in JSON body parser that automatically fills `req.body`.

## Part C — Express

### Step 7 — Answers

1. `app.get(path, handler)`.
2. Express generally requires fewer lines for routing and responses.
3. `express.json()` parses JSON request bodies with an appropriate content type and populates `req.body`; invalid JSON may trigger an error response.

### Step 8 — Complete `express-server.js`

```js
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).type('text/plain').send('Hello from Express!');
});

app.get('/students', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json([{ id: 1, name: 'Alex' }]);
});

app.post('/students', (req, res) => {
  res.status(201).json({ received: req.body });
});

app.put('/students/1', (req, res) => {
  res.json({ message: 'Student 1 replacement acknowledged', received: req.body });
});

app.patch('/students/1', (req, res) => {
  res.json({ message: 'Student 1 partial update acknowledged', received: req.body });
});

app.delete('/students/1', (req, res) => {
  res.sendStatus(204);
});

app.get('/old-page', (req, res) => {
  res.redirect('/students');
});

app.listen(3000, () => console.log('http://localhost:3000'));
```

**Expected requests:**

| Request | Status | Main outcome |
|---|---:|---|
| `GET /students` | 200 | JSON array of students; `Cache-Control: no-store` |
| `POST /students` | 201 | JSON object with received request data |
| `PUT /students/1` | 200 | JSON acknowledgment and body |
| `PATCH /students/1` | 200 | JSON acknowledgment and body |
| `DELETE /students/1` | 204 | No body |
| `GET /old-page` | 302 (before following) | `Location: /students` |
| `GET /undefined-path` | 404 | Express default not-found response |

**Step 8 answers:**

1. `app.use(express.json())`.
2. A `204 No Content` response must not include a response body; don't parse it as JSON.
3. No. The provided route only acknowledges the method; no database or in-memory mutation is implemented.
4. A request without a matching handler normally receives a 404 response.

## Part D — Comparison table

| Task | Native Node.js `http` | Express |
|---|---|---|
| Get request method | `req.method` | `req.method` |
| Choose a path to handle | `if (req.url === '/...')` | `app.get('/...', handler)` or another method-specific route |
| Set a response header | `res.setHeader('Name', 'value')` | `res.set('Name', 'value')` |
| Set a status code | `res.statusCode = 200` | `res.status(200)` |
| Send a response body | `res.end('text')` | `res.send('text')` / `res.json(data)` |
| Read a JSON request body | Read stream and then `JSON.parse()` if desired | `express.json()` middleware, then `req.body` |

**Reflection answers:**

1. No. Both handle HTTP; Express is a framework built on Node.js's HTTP capabilities.
2. `Content-Type` describes the media type of the body in the message carrying it. `Accept` tells the server which response media types the client prefers or can handle.
3. Each communicates something different: method describes the intended operation, path identifies the target, status reports outcome, headers provide metadata, and body carries content where applicable.

## Optional extension — Example

Add to the Express server:

```js
app.get('/note', (req, res) => {
  res.json({ note: req.get('X-Student-Note') ?? null });
});
```

From the console on `localhost:3000`:

```js
const response = await fetch('/note', {
  headers: { 'X-Student-Note': 'Checking headers!' }
});
console.log(await response.json());
```

Expected body: `{ "note": "Checking headers!" }`.

## Tips for continuing on your own

- Stop one server before starting the other; only one can listen on port `3000`.
- A browser may request `/favicon.ico`; it is not the main document request.
- Redirects are commonly followed automatically by browser navigation and `fetch()`, so examine Network to locate the original `302`.
- The browser console and Network panel are enough for every exercise. If a separate `http-playground.html` is provided later, serving it from the **same origin** as the API avoids CORS complications.
- The examples are intentionally **not persistent CRUD operations**. They illustrate HTTP semantics and request handling, not storage.
