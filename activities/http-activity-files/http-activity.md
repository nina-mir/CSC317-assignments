# Exploring HTTP with Node.js and Express

This activity can be completed in class or independently. If you run out of time, continue from where you stopped and use **`http-activity-solutions.md`** to check your work and study the examples.

## Learning objectives

By the end, you should be able to:

1. Identify the method, path, headers, status code, and body of an HTTP exchange.
2. Distinguish **request headers** from **response headers**.
3. Send `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` requests.
4. Explain how `Content-Type`, `Accept`, `Cache-Control`, and `Location` are used.
5. Implement basic routes with Node.js and Express.

## Setup

Create a folder named `http-lab`. You will create two server files in this folder: `native-server.js` and `express-server.js`. **Run only one server at a time**, since both use port `3000`.

We will use your browser to send requests, so **curl and Postman are not required**.

> **Important:** The examples use CommonJS (`require`). If your `package.json` already specifies `"type": "module"`, use a new folder without that setting for this activity.

## Part A — HTTP using Node.js (built-in `http` module)

### Step 1 — Start a server and inspect the first request

Create `native-server.js`:

```js
const http = require('node:http');

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello from native Node.js!');
});

server.listen(3000, () => console.log('http://localhost:3000'));
```

Run `node native-server.js` and visit `http://localhost:3000/`.

**Observe:** In DevTools, open **Network**, reload, click the document request (usually `/`), and locate the **General**, **Request Headers**, **Response Headers**, and **Response** sections. Browsers may also request `/favicon.ico`; focus on the `/` request.

**Questions:**

1. What HTTP method did the browser use to load `/`?
2. What is the response status code? Where can you see it?
3. Is `Content-Type` shown under request headers, response headers, or both?

**Hints:** `req.method` and `req.url` describe the incoming request. `res.statusCode`, `res.setHeader()`, and `res.end()` build the outgoing response.

### Step 2 — Experiment with representation and response headers

Modify the same server so that the response body is `<h1>Hello HTTP!</h1>` and test these two response header values one at a time:

```js
res.setHeader('Content-Type', 'text/plain');
// then try 'text/html'
```

Add these two response headers:

```js
res.setHeader('Cache-Control', 'no-store');
res.setHeader('X-Class-Activity', 'http-lab');
```

Restart the server after editing (stop it with Ctrl+C, then run it again). Refresh the page and examine the Network panel.

**Questions:**

1. How does the browser display the same body with `text/plain` versus `text/html`?
2. Which side—client or server—sent `X-Class-Activity`?
3. What does `Cache-Control: no-store` tell caches to do?

**Hint:** The body is identical; the `Content-Type` value is what changes the browser's interpretation.

### Step 3 — Explore status codes and a redirect

Change your handler to support these paths:

| Path | Intended status | Intended behavior |
|---|---:|---|
| `/` | 200 | Return `Welcome` |
| `/missing` | 404 | Return `Page not found` |
| `/error` | 500 | Return `Example server error` |
| `/redirect` | 302 | Set `Location: /` and end the response |
| any other path | 404 | Return `Unknown path` |

Use `req.url` with `if` / `else if` statements.

**Hints:**

```js
if (req.url === '/missing') {
  res.statusCode = 404;
  res.end('Page not found');
}
```

```js
res.statusCode = 302;
res.setHeader('Location', '/');
res.end();
```

**Questions:**

1. Does an HTTP `404` mean the server is not running?
2. When you load `/redirect` in the browser, where do you end up? Use Network to find the redirect response (you may need **Preserve log**).
3. What do status codes and `Location` each contribute to a redirect?

### Step 4 — Read incoming request headers

At the beginning of your handler, log:

```js
console.log('Method:', req.method);
console.log('Path:', req.url);
console.log('Accept:', req.headers['accept']);
console.log('User-Agent:', req.headers['user-agent']);
console.log('All headers:', req.headers);
```

Reload `/` and inspect the terminal and DevTools.

**Questions:**

1. Which device/software sends the `User-Agent` request header?
2. What is the main purpose of the `Accept` request header?
3. Is `req.headers` a collection of incoming request headers or outgoing response headers?

**Hint:** In the native Node.js HTTP server, incoming request header names in `req.headers` are lowercased.

## Part B — Send different HTTP methods and bodies

### Step 5 — Use `fetch()` as your HTTP client

While your native server runs, open `http://localhost:3000/`, open the browser console, and try:

```js
const response = await fetch('/');
console.log(response.status, await response.text());
```

Now try each method below and inspect the server's terminal. (Your current server may give the same response for all methods; that is okay for this step.)

```js
await fetch('/', { method: 'POST' });
await fetch('/', { method: 'PUT' });
await fetch('/', { method: 'PATCH' });
await fetch('/', { method: 'DELETE' });
```

**Questions:**

1. Which property of the incoming request records the HTTP method?
2. Does merely using `DELETE` automatically delete something on your server?
3. Why is typing a URL in the address bar not enough to test all these methods?

**Hint:** Open DevTools **Network** again. Request method appears in the request details.

### Step 6 — Receive a JSON request body

Add an early branch in your native handler for `POST /echo`. Gather incoming data and send it back. You do **not** need to parse the JSON yet.

**Hints:**

```js
let body = '';
req.on('data', chunk => { body += chunk; });
req.on('end', () => {
  console.log('Received body:', body);
  // set status, Content-Type, and send a response here
});
```

```js
// Run in the browser console at localhost:3000
const response = await fetch('/echo', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alex', course: 'Web Development' })
});
console.log(response.status, await response.text());
```

**Tasks:** Return status **200**, response header **`Content-Type: application/json`**, and a JSON-formatted response body that includes the received text under a `received` property. Use `JSON.stringify(...)` to construct the response body. Ensure this branch ends with `return` so the handler does not send a second response.

**Questions:**

1. Where do you see `Content-Type: application/json` in the **request**?
2. Where do you see `Content-Type: application/json` in the **response**?
3. Why is a `POST` body not available as `req.body` automatically in native Node.js?

## Part C — Repeat with Express

### Step 7 — Create a second server

Stop your native server. In the `http-lab` directory, run:

```sh
npm init -y
npm install express
```

Create `express-server.js`:

```js
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).type('text/plain').send('Hello from Express!');
});

app.listen(3000, () => console.log('http://localhost:3000'));
```

Run `node express-server.js`, then use the browser to visit `/`.

**Questions:**

1. Which Express method corresponds to handling an HTTP `GET` request?
2. Compare Express's `res.status(...).send(...)` with the native server's response methods. Which feels shorter?
3. What is `express.json()` for?

### Step 8 — Add routes, methods, and headers

Implement the following Express routes. Data may remain entirely in memory; **no database is needed**.

| Method | Path | Response |
|---|---|---|
| GET | `/students` | JSON array containing at least one student |
| POST | `/students` | `201` plus JSON containing the submitted student object |
| PUT | `/students/1` | JSON message acknowledging replacement |
| PATCH | `/students/1` | JSON message acknowledging partial update |
| DELETE | `/students/1` | `204` with no response body |
| GET | `/old-page` | Redirect to `/students` |

Make `GET /students` include `Cache-Control: no-store` in its response.

**Hints:**

```js
app.get('/students', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json([{ id: 1, name: 'Alex' }]);
});
```

```js
app.post('/students', (req, res) => {
  res.status(201).json({ received: req.body });
});
```

```js
app.delete('/students/1', (req, res) => {
  res.sendStatus(204);
});
```

Test from the browser console while viewing `http://localhost:3000/`:

```js
const r1 = await fetch('/students');
console.log(r1.status, await r1.json());

const r2 = await fetch('/students', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: 2, name: 'Sam' })
});
console.log(r2.status, await r2.json());

const r3 = await fetch('/students/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Taylor' })
});
console.log(r3.status, await r3.json());

const r4 = await fetch('/students/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Jordan' })
});
console.log(r4.status, await r4.json());

const r5 = await fetch('/students/1', { method: 'DELETE' });
console.log(r5.status); // don't call .json() on an empty 204 response
```

For the redirect, visit `/old-page` or use the Network panel. Note that `fetch()` normally follows redirects automatically.

**Questions:**

1. Which Express feature makes incoming JSON data available as `req.body`?
2. Why doesn't the DELETE route return JSON when it uses status `204`?
3. Does `PUT /students/1` necessarily change anything just because the method is PUT?
4. What happens when a route does not match any Express handler?

## Part D — Compare and reflect

Complete this table:

| Task | Native Node.js `http` | Express |
|---|---|---|
| Get request method | ? | ? |
| Choose a path to handle | ? | ? |
| Set a response header | ? | ? |
| Set a status code | ? | ? |
| Send a response body | ? | ? |
| Read a JSON request body | ? | ? |

Answer in 1–3 sentences each:

1. Does Express use a different network protocol from Node.js's `http` module?
2. What is the difference between `Content-Type` and `Accept`?
3. Why are HTTP method, path, status code, headers, and body worth examining separately?

## Optional extension (if time permits)

Create a route that reads a custom request header `X-Student-Note` and sends its value back in a JSON response. Send the header using `fetch()` and inspect both the request and response in Network.

> **Studying on your own:** You can complete all the steps using the browser console on Windows, macOS, or Linux. The separate HTML playground is not needed for these exercises. If you get stuck, compare your code with the solutions, then try changing a method, path, header, or response to see what happens.
