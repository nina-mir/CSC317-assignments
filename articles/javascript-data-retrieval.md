# Twelve Ways JavaScript Can Read or Receive Data

**CSC 317 — Web Development**  
**Scope:** Node.js (server-side JavaScript) and browser JavaScript

JavaScript programs obtain data from several sources: command-line arguments, files, network services, user interfaces, persistent storage, and operating-system facilities. The appropriate method depends on **where the data resides**, **which environment runs the code**, and **whether the data is needed once or continuously**.

## 1. Command-line arguments — `process.argv`

**Environment:** Node.js

`process.argv` is an array containing the arguments supplied when a Node.js program starts. The first two entries identify the Node executable and script, so application arguments usually begin at index `2`.

```js
// Run: node greet.js Ada
const name = process.argv[2];
console.log(`Hello, ${name}`);
```

**Useful for:** Small command-line utilities, passing a filename to a script, and selecting an execution mode such as `--verbose`.

## 2. Files — `fs`

**Environment:** Node.js

The built-in `node:fs` module reads files stored on the machine running the program. Asynchronous methods are generally preferred in servers because they do not block the event loop while waiting for file operations to finish.

```js
const fs = require('node:fs/promises');

async function main() {
  const text = await fs.readFile('notes.txt', 'utf8');
  console.log(text);
}
main();
```

**Useful for:** Loading a configuration file, reading a saved report, or processing data exported as CSV or JSON.

## 3. HTTP API requests — `fetch()`

**Environment:** Browser and modern Node.js

`fetch()` sends an HTTP request and returns a promise for the response. Applications commonly use it to retrieve JSON from a remote service; `response.json()` parses the response body into a JavaScript value.

```js
async function loadUser() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const user = await response.json();
  console.log(user.name);
}
loadUser();
```

**Useful for:** Weather dashboards, retrieving information from a REST API, and loading data from a server without reloading the page.

## 4. DOM API — reading page elements

**Environment:** Browser

The Document Object Model (DOM) represents an HTML document as objects JavaScript can inspect. Properties such as `.value` and `.textContent` let code read current input values and displayed text from the page.

```html
<input id="username" value="Ada">
<script>
  const name = document.querySelector('#username').value;
  console.log(name);
</script>
```

**Useful for:** Reading a search field, checking a selected option, and extracting text from existing page elements.

## 5. HTML forms — `FormData`

**Environment:** Browser

`FormData` gathers the named controls of a form into key-value entries. It is especially convenient when a form contains several fields and the application needs to read or submit them together.

```html
<form id="profile">
  <input name="city" value="San Francisco">
</form>
<script>
  const form = document.querySelector('#profile');
  const data = new FormData(form);
  console.log(data.get('city'));
</script>
```

**Useful for:** Registration forms, surveys, and preparing form fields for an HTTP submission.

## 6. Environment variables — `process.env`

**Environment:** Node.js

Environment variables are values supplied to a process by its operating-system environment or deployment platform. In Node.js, `process.env` exposes them as strings (when defined), allowing configuration without changing program source code.

```js
// Run on macOS/Linux: PORT=3000 node server.js
const port = Number(process.env.PORT ?? 8080);
console.log(`Listening on port ${port}`);
```

**Useful for:** Configuring server ports, selecting development versus production settings, and supplying credentials through deployment configuration.

## 7. URL parameters — `URLSearchParams`

**Environment:** Browser and Node.js

A URL can carry data in its query string, such as `?category=books&page=2`. `URLSearchParams` provides an API for reading these values; in the browser, the current page's query string is available through `location.search`.

```js
// Suppose the page URL ends with: ?category=books&page=2
const params = new URLSearchParams(window.location.search);
console.log(params.get('category')); // "books"
```

**Useful for:** Search filters, pagination, and shareable links that preserve a page's state. In Node.js, use `new URL(requestUrl, base).searchParams` instead of `window`.

## 8. Browser storage — `localStorage`

**Environment:** Browser

`localStorage` stores string key-value pairs associated with a website's origin. Its data normally persists across browser restarts, making it useful for small, non-sensitive preferences rather than authoritative application records.

```js
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
console.log(theme);
```

**Useful for:** Remembering a theme preference, a dismissed notice, or a simple draft setting.

## 9. Databases — SQLite and SQL queries

**Environment:** Commonly Node.js (server-side)

A database organizes information so an application can query specific records rather than read and parse an entire file. In a Node.js application, a SQLite library executes SQL and returns rows as JavaScript values.

```js
// Example using better-sqlite3 (install separately)
const Database = require('better-sqlite3');
const db = new Database('school.db');
const students = db.prepare('SELECT id, name FROM students').all();
console.log(students);
db.close();
```

**Useful for:** Student rosters, inventory systems, and applications that require filtering, updating, and relating structured records. The example assumes the database already contains a `students` table.

## 10. Standard input — `process.stdin`

**Environment:** Node.js

Standard input is a stream through which a program can receive text from a terminal or another process. Node.js can listen for incoming data, making this approach useful for interactive commands or piped input.

```js
process.stdout.write('Enter your name: ');
process.stdin.once('data', (chunk) => {
  console.log(`Hello, ${chunk.toString().trim()}`);
  process.stdin.pause();
});
```

**Useful for:** Interactive terminal applications, simple prompts, and command-line pipelines.

## 11. Cookies — `document.cookie`

**Environment:** Browser (with server-side access through HTTP headers)

Cookies are small values associated with a website that browsers can send with relevant HTTP requests. Browser JavaScript can read cookies not marked `HttpOnly`; the server can read incoming cookies from the request's `Cookie` header.

```js
// A cookie accessible to browser JavaScript:
document.cookie = 'language=en; Path=/; SameSite=Lax';
console.log(document.cookie); // e.g., "language=en"
```

**Useful for:** Remembering a language preference or maintaining server-managed session state. Sensitive session cookies should generally use `HttpOnly` and `Secure`, which prevents reading them with `document.cookie`.

## 12. WebSockets — `message` events

**Environment:** Browser and Node.js (using an appropriate WebSocket implementation)

A WebSocket establishes a persistent, two-way connection between a client and a server. After the connection opens, messages can arrive without the client repeatedly making new HTTP requests.

```js
// Browser example; assumes a WebSocket server is running here.
const socket = new WebSocket('ws://localhost:8080');
socket.addEventListener('message', (event) => {
  console.log('Received:', event.data);
});
```

**Useful for:** Live chat, multiplayer games, and dashboards that update as new events occur.

---

## Choosing an approach

| Data source or requirement | Common choice |
|---|---|
| Input provided when a script starts | `process.argv` |
| Text or structured data saved as a local file | `fs` |
| Data provided by another HTTP service | `fetch()` |
| A single value or existing text on a web page | DOM API |
| Multiple fields within an HTML form | `FormData` |
| Server configuration supplied by the environment | `process.env` |
| Filters or identifiers embedded in a URL | `URLSearchParams` |
| Small, persistent browser preferences | `localStorage` |
| Structured records requiring queries | Database / SQL |
| Text entered or piped into a command-line program | `process.stdin` |
| Browser–server state carried in HTTP cookies | Cookies |
| Continuous, near-real-time messages | WebSockets |

**Key distinction:** Some of these APIs read data already available in an environment (DOM, environment variables, storage), while others request or receive data from elsewhere (`fetch()`, file reads, database queries, streams, and WebSockets). They are not interchangeable: choosing a method depends on the application's architecture and data source.
