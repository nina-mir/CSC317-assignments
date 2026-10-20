# Node.js `fs` Module — Mini Activity (Sync vs Callback APIs)

Welcome! This hands-on activity helps you *feel* the difference between synchronous and asynchronous (callback-based) file I/O in Node.js using the built-in `fs` module. You’ll practice reading and writing files, experiment with encodings, and observe event-loop behavior. 🌈

> 💡 **Why it matters:** Understanding `fs` is core to building CLI tools, servers, and data pipelines. You’ll learn when blocking is acceptable (tiny scripts) and when non-blocking patterns are essential (servers / CLIs).

---

## 1) Quick Ref: Ways to Read & Write Files

### Read (Sync)

* `fs.readFileSync(path[, options])` → returns `Buffer` (or `string` if `options.encoding` is set)
* **Blocks** the event loop until the data is available.

### Read (Callback / Async)

* `fs.readFile(path[, options], callback)` → calls `callback(err, data)`
* **Non-blocking**; lets other work proceed while I/O completes.

### Write (Sync)

* `fs.writeFileSync(path, data[, options])` → returns `undefined`
* **Blocks** the event loop during disk write.

### Write (Callback / Async)

* `fs.writeFile(path, data[, options], callback)` → `callback(err)`
* **Non-blocking**.

---

## 2) Encodings in Practice

* If you **omit** `encoding`, `fs` returns a **Buffer** (binary data).
* Common encodings:

  * `'utf8'` (most common for text)
  * `'utf16le'` (little-endian UTF-16)
  * `'latin1'` (ISO-8859-1; 1 byte per char)
  * `'base64'` (text representation of binary)
  * `'hex'` (hex string)
* **Default behavior:** No encoding specified → **Buffer**.
  To get a string directly, pass `{ encoding: 'utf8' }`.

---

## 3) Provided Examples (Run These!)

> Create a file like `fs-activity.js` and paste/run each section separately to observe behavior.

### A) `readFileSync` → Buffer (no encoding)

```js
'use strict'
const { readFileSync } = require('fs')
const contents = readFileSync(__filename)
console.log(contents)
```

### B) `readFileSync` → String (`utf8`)

```js
'use strict'
const { readFileSync } = require('fs')
const contents = readFileSync(__filename, {encoding: 'utf8'})
console.log(contents)
```

### C) Read then Write (Sync) to `out.txt`

```js
'use strict'
const { join } = require('path')
const { readFileSync, writeFileSync } = require('fs')
const contents = readFileSync(__filename, {encoding: 'utf8'})
writeFileSync(join(__dirname, 'out.txt'), contents.toUpperCase())
```

### D) Append Mode (`flag: 'a'`)

```js
'use strict'
const { join } = require('path')
const { readFileSync, writeFileSync } = require('fs')
const contents = readFileSync(__filename, {encoding: 'utf8'})
writeFileSync(join(__dirname, 'out.txt'), contents.toUpperCase(), {
  flag: 'a'
})
```

### E) `readFile` (Callback)

```js
const { readFile } = require('fs') 
readFile(__filename, (err, contents) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(contents.toString())
})
```

### F) Multiple Concurrent Reads (Callback)

```js
const { readFile } = require('fs')
const [ bigFile, mediumFile, smallFile ] = Array.from(Array(3)).fill(__filename)

const print = (err, contents) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(contents.toString())
}
readFile(bigFile, print)
readFile(mediumFile, print)
readFile(smallFile, print)
```

---

## 4) New Examples You’ll Use in Activities

### Write (Callback) with encoding

```js
'use strict'
const { writeFile } = require('fs')
writeFile('hello.txt', 'Hallo Welt!\n', { encoding: 'utf8' }, (err) => {
  if (err) return console.error('Write failed:', err)
  console.log('Wrote hello.txt')
})
```

### Read as different encodings

```js
'use strict'
const { readFile } = require('fs')
readFile('hello.txt', { encoding: 'utf8' }, (e, text) => {
  if (e) return console.error(e)
  console.log('utf8 text:', text)
})
readFile('hello.txt', (e, buf) => {
  if (e) return console.error(e)
  console.log('buffer hex:', buf.toString('hex'))
})
```

---

## 5) Hands-On Activities

> Keep each task small and run it to observe outcomes. Consider screen-recording your console output for reflection later.

### Activity 1 — Spot the Difference (Sync vs Callback)

1. Copy examples **A** and **E** into separate files (`sync.js` and `async.js`).
2. Add a `console.log('START')` at the very top and `console.log('END')` at the very bottom of each file.
3. Run both files and compare the order of logs vs content printing.

**Goal:** Notice how synchronous code **blocks** until the file read completes, while the callback version defers output.

---

### Activity 2 — Make a Text Normalizer (Sync)

1. Create `notes.txt` with a few lines (mixed case, extra spaces).
2. Write `normalize.js`:

   * Read `notes.txt` **synchronously** with `{ encoding: 'utf8' }`.
   * Trim whitespace on each line and `toLowerCase()` all text.
   * Write the output to `notes.normalized.txt` (overwrite if exists).
3. Re-run after editing `notes.txt` and confirm results.

**Goal:** Practice `readFileSync` + `writeFileSync` with string encoding.

---

### Activity 3 — Logger with Append (Sync)

1. Write `log.js` that appends a timestamped line to `app.log` using:

   ```js
   writeFileSync('app.log', `${new Date().toISOString()} - ping\n`, { flag: 'a' })
   ```
2. Run `node log.js` multiple times and open `app.log`.

**Goal:** Use `flag: 'a'` to keep logs growing.

---

### Activity 4 — Encoding Explorer (Callback)

1. Create `emoji.txt` with `"I ❤️ Node.js"`.
2. Write `encodings.js` that:

   * Reads file with `{ encoding: 'utf8' }` and logs the text.
   * Reads file **without** encoding and logs `buf.length` and `buf.toString('hex')`.
   * Reads again and logs `buf.toString('base64')`.

**Goal:** See how binary and text representations differ.

---

### Activity 5 — Parallel Reads (Callback)

1. Duplicate your current file into `a.txt`, `b.txt`, `c.txt`.
2. Read all three in parallel with `fs.readFile` and a shared `print` callback (like example **F**).
3. Add an extra `console.log('Kicking off reads...')` before the calls and observe ordering.

**Goal:** Observe non-deterministic completion order and non-blocking kickoff.

---

### Activity 6 — Migrate Sync → Callback (Refactor)

1. Take `normalize.js` from Activity 2.
2. Rewrite it to:

   * `readFile('notes.txt', { encoding: 'utf8' }, ...)`
   * Transform text (trim/`toLowerCase`).
   * `writeFile('notes.normalized.txt', transformed, { encoding: 'utf8' }, ...)`
3. Add proper error handling at each step.

**Goal:** Practice async control flow with callbacks and robust error paths.

---

## 6) Tips & Important Facts

* 🧠 **Rule of thumb:** Use **sync** I/O only in tiny scripts or startup paths. For servers/CLIs, prefer **async** (callbacks, promises, or `fs/promises`).
* 🧵 **Event loop:** Sync calls block *all* other work. Async calls free the loop to handle timers, network, etc.
* 🔤 **Encoding:** If you want text, **set `encoding`**. Otherwise you’ll get a `Buffer`.
* ➕ **Append mode:** `{ flag: 'a' }` prevents overwriting and adds to the end of a file.
* 🪵 **Atomic-ish writes:** For critical writes, write to a temp file, then `fs.rename` to reduce partial-write risks.
* 🧪 **Determinism:** Async completion order may vary—design your code accordingly (collect results, use counters, or switch to promises).
* ♿ **Inclusive teamwork tip:** Pair up and narrate your thinking. Rotate who types (driver) and who reviews (navigator) to support everyone’s learning styles.

---

## 7) Challenges (Stretch Goals)

1. **Hex Dumper (Callback):**
   Read a file as `Buffer` and print a classic hex dump (8 or 16 bytes per line).
2. **Append-Only Daily Log (Sync or Async):**
   Write to `logs/YYYY-MM-DD.log` using `{ flag: 'a' }`, creating directories if needed.
3. **Encoding Round-Trip:**
   Read a UTF-8 text, convert to Base64, write `data.b64`. Then read `data.b64`, decode back to UTF-8, and verify equality.

---

## 8) Answers / Reference Implementations

> Your outputs may differ slightly—that’s okay! Focus on correctness and handling errors.

### Activity 2 — `normalize.js` (Sync)

```js
'use strict'
const { readFileSync, writeFileSync } = require('fs')

const input = readFileSync('notes.txt', { encoding: 'utf8' })
const normalized = input
  .split('\n')
  .map(line => line.trim().toLowerCase())
  .join('\n')

writeFileSync('notes.normalized.txt', normalized, { encoding: 'utf8' })
console.log('Wrote notes.normalized.txt')
```

### Activity 3 — `log.js`

```js
'use strict'
const { writeFileSync } = require('fs')

writeFileSync('app.log', `${new Date().toISOString()} - ping\n`, { flag: 'a' })
console.log('Appended to app.log')
```

### Activity 4 — `encodings.js`

```js
'use strict'
const { readFile } = require('fs')

readFile('emoji.txt', { encoding: 'utf8' }, (e, text) => {
  if (e) return console.error('utf8 read error:', e)
  console.log('utf8:', text)

  readFile('emoji.txt', (e2, buf) => {
    if (e2) return console.error('buffer read error:', e2)
    console.log('buffer length:', buf.length)
    console.log('hex:', buf.toString('hex'))
    console.log('base64:', buf.toString('base64'))
  })
})
```

### Activity 5 — Parallel Reads

```js
'use strict'
const { readFile } = require('fs')
const files = ['a.txt', 'b.txt', 'c.txt']

const print = (err, contents) => {
  if (err) return console.error('read error:', err)
  console.log('--- file ---')
  console.log(contents.toString())
}

console.log('Kicking off reads...')
files.forEach(f => readFile(f, print))
```

### Activity 6 — Async `normalize-async.js`

```js
'use strict'
const { readFile, writeFile } = require('fs')

readFile('notes.txt', { encoding: 'utf8' }, (err, input) => {
  if (err) return console.error('read error:', err)

  const normalized = input
    .split('\n')
    .map(line => line.trim().toLowerCase())
    .join('\n')

  writeFile('notes.normalized.txt', normalized, { encoding: 'utf8' }, (werr) => {
    if (werr) return console.error('write error:', werr)
    console.log('Wrote notes.normalized.txt (async)')
  })
})
```

### Challenge Hints (not full solutions)

* **Hex Dumper:** Use `buf.slice(i, i+16)` and `toString('hex')`; pad columns for alignment.
* **Daily Log:** Build path with `new Date().toISOString().slice(0,10)`; ensure dir using `fs.mkdirSync('logs', { recursive: true })`.
* **Round-Trip:** `Buffer.from(base64String, 'base64').toString('utf8')`.

---

## 9) What to Try Next

* Convert the callback versions to **Promises** using `fs.promises` or `util.promisify`.
* Add **error-first** callback patterns consistently.
* Benchmark sync vs async on large files to compare performance.

---

### ✅ Summary

* Sync APIs are simple but **block** the event loop.
* Callback APIs are **non-blocking**, better for scalable apps.
* **Encoding** determines whether you get `Buffer` or human-readable `string`.
* Append with `{ flag: 'a' }`, and always handle errors.

Viel Erfolg & happy hacking! ✨
