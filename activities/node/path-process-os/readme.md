# 🧭 Node.js Core Modules Mini Activity — Path, Process, and OS

Welcome to this mini hands-on activity sheet!  
In this guide, you’ll explore three important **Node.js core modules**:
- [`path`](https://nodejs.org/api/path.html)
- [`process`](https://nodejs.org/api/process.html)
- [`os`](https://nodejs.org/api/os.html)

You’ll learn what each module does and complete small exercises to understand how to use them effectively.

---

## 🧩 1. The `path` Module

The **`path`** module provides utilities for working with file and directory paths in Node.js.  
You don’t need to install it — it’s built-in.

### 🔹 Example:

```js
'use strict';
const path = require('path');

console.log('parse:', path.parse(__filename));
console.log('basename:', path.basename(__filename));
console.log('dirname:', path.dirname(__filename));
console.log('extname:', path.extname(__filename));

console.log('current filename:', __filename);
console.log('current dirname:', __dirname);
````

### 🧠 What You Learned:

* `path.parse(file)` → returns an object with `root`, `dir`, `base`, `ext`, and `name`.
* `path.basename(file)` → returns the file’s name.
* `path.dirname(file)` → returns the folder that contains the file.
* `path.extname(file)` → returns the file’s extension.
* `__filename` and `__dirname` are global variables that give you the current file name and directory.

### 💡 Tips:

* Use `path.join()` to safely combine folder names across OSes.
* Always use the `path` module instead of manually concatenating strings with `/` or `\`.

📘 **Docs:** [Node.js path module](https://nodejs.org/api/path.html)

---

### 🧪 Activity 1: Path Fun

1. Create a file called `path-demo.js`.
2. Print:

   * The current file’s name.
   * Its parent folder.
   * Its extension.
   * The parsed object using `path.parse(__filename)`.
3. Use `path.join()` to create a path like `/users/student/docs/notes.txt`.

🧩 **Challenge:**
Write a small function that returns just the file’s name without its extension.

💡 **Hint:** Use `path.basename(file, path.extname(file))`.

---

## ⚙️ 2. The `process` Module

The **`process`** object gives you information about the Node.js process and lets you interact with it.

### 🔹 Example:

```js
'use strict';

console.log('Platform:', process.platform);
console.log('Current working dir:', process.cwd());
console.log('Memory usage:', process.memoryUsage());
console.log('Environment variables:', process.env);

process.env.MY_APP_MODE = 'development';
console.log('New env var:', process.env.MY_APP_MODE);

// To exit the process:
setTimeout(() => {
  console.log('Exiting...');
  process.exit();
}, 2000);
```

### 🧠 What You Learned:

* `process.platform` → tells you the OS platform (like `darwin`, `win32`, or `linux`).
* `process.cwd()` → gives the current working directory.
* `process.env` → returns environment variables (you can add your own too!).
* `process.exit()` → stops the process.
* `process.memoryUsage()` → returns memory usage statistics.

### 💡 Tips:

* Environment variables are commonly used to store configuration data like API keys.
* Never commit `.env` files to GitHub!
* To set env vars before running a script:

  * **Linux/macOS:** `MY_APP_MODE=production node app.js`
  * **Windows (PowerShell):** `$env:MY_APP_MODE="production"; node app.js`

📘 **Docs:** [Node.js process module](https://nodejs.org/api/process.html)

---

### 🧪 Activity 2: Process Explorer

1. Create a file called `process-demo.js`.
2. Print the platform, current working directory, and total memory usage.
3. Add a new environment variable and print it.
4. Use `setTimeout` to exit the process after 3 seconds.

🧩 **Challenge:**
Write a small script that checks if the OS is Windows. If so, print `"Running on Windows!"`, otherwise print `"Running on another OS!"`.

💡 **Hint:** Compare `process.platform === 'win32'`.

---

## 💻 3. The `os` Module

The **`os`** module provides methods for interacting with the operating system.

### 🔹 Example 1:

```js
'use strict';
const os = require('os');

console.log('Hostname:', os.hostname());
console.log('Home dir:', os.homedir());
console.log('Temp dir:', os.tmpdir());
```

### 🔹 Example 2 — Monitoring System Stats:

```js
'use strict';
const os = require('os');

setInterval(() => {
  console.log('System uptime:', os.uptime());
  console.log('Free memory:', os.freemem());
  console.log('Total memory:', os.totalmem());
  console.log('CPU cores:', os.cpus().length);
  console.log();
}, 1000);
```

### 🧠 What You Learned:

* `os.hostname()` → computer’s name.
* `os.homedir()` → current user’s home directory.
* `os.tmpdir()` → system temp folder.
* `os.uptime()` → system uptime (in seconds).
* `os.freemem()` / `os.totalmem()` → memory stats.
* `os.cpus()` → info about CPU cores.

### 💡 Tips:

* Combine `os` with `process` to make system monitoring tools.
* You can use these values to log performance data in production.

📘 **Docs:** [Node.js os module](https://nodejs.org/api/os.html)

---

### 🧪 Activity 3: OS Monitor

1. Create a file called `os-monitor.js`.
2. Every 2 seconds, log:

   * The hostname.
   * Free and total memory.
   * System uptime.
3. Stop the script after 10 seconds using `setTimeout`.

🧩 **Challenge:**
Write a function that calculates **used memory percentage** using:

```js
const used = ((os.totalmem() - os.freemem()) / os.totalmem()) * 100;
```

💡 **Hint:** Try rounding it with `toFixed(2)` for a cleaner output.

---

## ✅ Summary

| Module    | Purpose                       | Common Use                          |
| --------- | ----------------------------- | ----------------------------------- |
| `path`    | Handle file system paths      | Get file names, dirs, extensions    |
| `process` | Interact with Node.js runtime | Env vars, platform, memory, cwd     |
| `os`      | Access system info            | Memory, uptime, user info, hostname |

---

## 🧠 Extra Challenge

Create a script called `system-info.js` that:

1. Prints the current working directory.
2. Prints total and free memory in MB.
3. Prints the OS type and platform.
4. Prints the current file path (using `path`).

💡 **Bonus:** Try exporting these as a function and import it into another file using `require()`!

---

Happy coding! 💚
Remember to check the docs often — the [Node.js API Reference](https://nodejs.org/api/) is your best friend!

