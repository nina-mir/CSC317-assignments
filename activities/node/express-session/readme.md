# My Session-Based Secret Club — a Node.js + Express project using `express-session`.

But first: 

Understanding the difference between **cookies** and **sessions** is *key* to building secure and user-friendly web applications.

---

## 🍪 Cookie vs. Session: The Core Differences

| Feature         | 🍪 **Cookie**                                                                      | 🔐 **Session**                                                |
| --------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Storage**     | Stored in the **browser** (client-side)                                            | Stored on the **server**                                      |
| **Data Size**   | Small (limited to \~4KB)                                                           | Can store more data (depends on server setup)                 |
| **Security**    | Less secure (can be seen/edited by user)                                           | More secure (user can't see contents)                         |
| **Persistence** | Can persist across browser sessions (if not expired)                               | Lives until the browser is closed or session expires          |
| **Use Case**    | Store small, public, or long-lived info (e.g. theme preference, remember-me token) | Store sensitive or temporary info (e.g. user ID, login state) |
| **Visibility**  | Accessible via JavaScript (`document.cookie`)                                      | Not directly accessible on the client                         |
| **Transfer**    | Sent with every request to the server                                              | Identified by a session ID in a cookie                        |

---

## 🧠 How They Work Together

In a session-based app (like the one we will build today!):

1. When a user logs in, the server creates a **session object** and stores it.
2. The server then sends a **cookie** to the browser with just the **session ID**.
3. On future requests, the browser sends the session ID back via that cookie.
4. The server uses the session ID to retrieve the user’s session data.

> ✅ So: **cookies** carry the *session ID*, and the **session** contains all the actual data (on the server).

---

## 🔒 Security Best Practices

* **Cookies** should not store sensitive info like passwords or user roles.
* Always use **`HttpOnly`** and **`Secure`** flags for session cookies.
* Consider setting **`maxAge`** or **`expires`** to control session lifetime.

---


LET'S BUILD THEN!


## 🏁 Step 0: Prerequisites

Make sure you have:

* **Node.js** and **npm** installed
* A code editor (like **VS Code**)
* A terminal (e.g., built-in terminal in VS Code)

---

## 📁 Step 1: Project Setup

### 🔧 Activity: Initialize a Node project

In your terminal:

```bash
mkdir session-club
cd session-club
npm init -y
npm install express express-session
```

### 📄 Create a file: `server.js`

```bash
touch server.js
mkdir views
```

---

## 🚀 Step 2: Build the Express Server with Session Middleware

Edit `server.js`:

```js
const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true })); // for form data
app.use(session({
  secret: 'keyboard cat', // Change in production!
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true only with HTTPS
}));

// Serve static HTML files
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/home.html')));

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views/login.html')));

app.post('/login', (req, res) => {
  const username = req.body.username;
  if (username) {
    req.session.username = username;
    res.redirect('/secret');
  } else {
    res.send('Please enter a username');
  }
});

app.get('/secret', (req, res) => {
  if (req.session.username) {
    res.sendFile(path.join(__dirname, 'views/secret.html'));
  } else {
    res.redirect('/login');
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
```

---

## 🧱 Step 3: Create HTML Views

### 🔑 `views/home.html`

```html
<!DOCTYPE html>
<html>
<body>
  <h1>Welcome to the Clubhouse</h1>
  <a href="/login">Login</a>
</body>
</html>
```

### 🔐 `views/login.html`

```html
<!DOCTYPE html>
<html>
<body>
  <h1>Login</h1>
  <form action="/login" method="POST">
    <input type="text" name="username" placeholder="Enter your username" required>
    <button type="submit">Login</button>
  </form>
</body>
</html>
```

### 🔒 `views/secret.html`

```html
<!DOCTYPE html>
<html>
<body>
  <h1>Secret Page!</h1>
  <p>Only logged-in users can see this. Welcome!</p>
  <form action="/logout" method="POST">
    <button type="submit">Logout</button>
  </form>
</body>
</html>
```

---

## 🧠 Learning Activities

### 🔍 1. **Explore `req.session`**

📝 Add `console.log(req.session)` inside any route to inspect what’s stored in it.

### 💡 2. **Break It on Purpose**

Try to:

* Access `/secret` before logging in. What happens?
* Refresh the page. Does the session persist?
* Add a logout button and click it. What changes?

### 🧪 3. **Enhancement Challenge**

✅ Add these features as practice:

* Display the username on the secret page
* Block login form if already logged in
* Add session expiration using `cookie.maxAge`

### 🧠 4. **Discussion Prompts**

* What’s the difference between cookie and session?
* Why does the secret route need protection?
* What happens if you change the secret in the session config?

---

## 🎁 Optional Extension

Want to go further?

* Store sessions in a file or database using `connect-sqlite3` or `connect-mongo`
* Use proper authentication with `bcrypt` + user database
* Add a "member-only chat" with session check

---

Would you like me to zip this into a downloadable starter kit, or walk you through one of the enhancements next?
