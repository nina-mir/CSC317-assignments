# CSC 317 — Activity 3: Handling Forms with Pug & POST

## Learning Objectives
By the end of this activity, you will be able to:
1. Build an HTML form in Pug that sends data to an Express server
2. Explain the difference between `GET` and `POST` requests
3. Read submitted form data with `express.urlencoded()` and `req.body`
4. Validate input **on the server** and show error messages
5. Use the **Post/Redirect/Get** pattern to avoid duplicate submissions

## Before You Start
- [ ] You finished Activity 2, and your Pug pages run at `localhost:3000`
- [ ] Stop your server (`Ctrl + C`)

💡 **Big idea:** So far, data has only flowed **from** the server **to** the browser. Forms let data flow the other way: the user types something, the browser sends it to the server, and the server decides what to do with it.

**What you'll build:** a class **Guestbook** where visitors sign their name, pick a favorite topic, and leave a message.

---

## Part 1 — How Forms Talk to Servers (5 min)

A form has two key attributes:
- **`action`**: *where* to send the data (a URL on your server)
- **`method`**: *how* to send it (`GET` or `POST`)

| | `GET` | `POST` |
|---|---|---|
| Where the data goes | In the URL: `/search?q=pizza` | In the request **body** (hidden from the URL) |
| Used for | Reading or searching | Creating or changing data |
| Bookmarkable? | Yes | No |
| Good for passwords? | ❌ Never | ✅ Yes (with HTTPS) |

Every input needs a **`name`** attribute. The name becomes the **key** the server uses to find the value.

❓ **Q1.** *You search a shopping site and the URL changes to `/search?q=shoes&color=red`. Which method did the form use? What are the two `name`s?*
______________________________________________

---

## Part 2 — Build the Form Template (10 min)

**Step 1.** Create `views/guestbook.pug`:
```pug
extends layout

block content
  h2 Sign the Guestbook

  //- Show validation errors, if there are any
  if errors.length
    ul.errors
      each error in errors
        li= error

  form(action="/guestbook" method="POST")
    label(for="name") Name
    input#name(type="text" name="name" value=values.name required)

    label(for="topic") Favorite topic
    select#topic(name="topic" required)
      option(value="") -- Choose one --
      each t in topics
        option(value=t selected=(t === values.topic))= t

    label(for="message") Message
    textarea#message(name="message" rows="4" required)= values.message

    button(type="submit") Sign the guestbook

  h2 Entries (#{entries.length})
  if entries.length
    each entry in entries
      article.entry
        h3 #{entry.name} loves #{entry.topic}
        p= entry.message
        small= entry.date
  else
    p No entries yet. Be the first!
```

> 💡 **How the dropdown line works:** In `option(value=t selected=(t === values.topic))= t`, each part does one job. `value=t` has no quotes, so Pug uses the *variable* `t` (like `'CSS'`) as the option's value. `selected=(t === values.topic)` is a true/false test: when it's `true`, Pug adds the `selected` attribute, and when it's `false`, Pug leaves it out. That way, only the topic the user picked before stays selected when the form comes back with errors. The final `= t` sets the text the user sees in the dropdown, just like `h1= title`.

**Step 2.** Add a Guestbook link to the `nav` in `views/layout.pug`:
```pug
      nav
        a(href="/") Home
        a(href="/topics") Topics
        a(href="/guestbook") Guestbook
```

**Step 3.** Add form styles to `public/css/style.css`:
```css
form {
  display: grid;
  gap: 0.5rem;
  max-width: 400px;
  margin-bottom: 2rem;
}

input, select, textarea, button {
  font: inherit;
  padding: 0.4rem;
}

button {
  background: #4b2e83;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.errors {
  color: #b00020;
  background: #fde8eb;
  padding: 0.75rem 2rem;
  border-radius: 4px;
}

.entry {
  border-left: 4px solid #4b2e83;
  padding-left: 1rem;
  margin-bottom: 1rem;
}
```

❓ **Q2.** *Look at the `input` line. What do `name="name"` and `value=values.name` each do?*
______________________________________________

---

## Part 3 — Handle the Form on the Server (15 min)

**Step 4.** In `server.js`, add this line **above** your routes, next to `express.static()`:
```javascript
// Read form data from POST requests and put it in req.body
app.use(express.urlencoded({ extended: false }));
```

**Step 5.** Add the guestbook data and routes **above** `app.listen()`:
```javascript
// Data lives in memory for now
const topics = ['HTML', 'CSS', 'Node.js', 'Express', 'Pug'];
const entries = [];

// GET: show the form and all entries
app.get('/guestbook', (req, res) => {
  res.render('guestbook', {
    title: 'Guestbook',
    topics,
    entries,
    errors: [],
    values: {}
  });
});

// POST: receive the form data
app.post('/guestbook', (req, res) => {
  // 1. Read the data (and trim extra spaces)
  const name = (req.body.name || '').trim();
  const topic = req.body.topic || '';
  const message = (req.body.message || '').trim();

  // 2. Validate on the server
  const errors = [];
  if (!name) errors.push('Name is required.');
  if (!topics.includes(topic)) errors.push('Please choose a topic from the list.');
  if (message.length < 5) errors.push('Message must be at least 5 characters.');

  // 3a. Problems? Show the form again with errors AND the user's input
  if (errors.length > 0) {
    return res.status(400).render('guestbook', {
      title: 'Guestbook',
      topics,
      entries,
      errors,
      values: { name, topic, message }
    });
  }

  // 3b. All good! Save the entry (newest first)...
  entries.unshift({ name, topic, message, date: new Date().toLocaleString() });

  // ...then redirect so a refresh won't resubmit the form
  res.redirect('/guestbook');
});
```

**Step 6.** Run `node server.js` and visit **http://localhost:3000/guestbook**. Sign the guestbook two or three times.

✅ **Checkpoint 3:** New entries appear at the top of the list, and the form is empty again after each one. Show a neighbor.

---

## Part 4 — Watch the Request in DevTools (5 min)

**Step 7.** Open DevTools → **Network** tab. Check **Preserve log**. Submit the form once more.

**Step 8.** Click the `guestbook` request whose method is **POST**, then open the **Payload** tab.

❓ **Q3.** *What status code did the POST request return? What request did the browser make right after it, and why?*
______________________________________________

❓ **Q4.** *What do you see in the Payload tab?*
______________________________________________

**Step 9.** Stop the server, start it again, and reload the guestbook.

❓ **Q5.** *What happened to your entries? Why?*
______________________________________________

---

## Part 5 — Break It & Fix It (15 min)
Try each change, restart the server if needed, write down what happens, then undo it.

| # | Change you make | What happened? | How you fixed it |
|---|---|---|---|
| A | Comment out the `express.urlencoded()` line and submit the form | | |
| B | Remove `name="message"` from the `textarea`, then submit a long message | | |
| C | Change the form to `method="GET"` and submit | | |
| D | Replace `res.redirect('/guestbook')` with the same `res.render(...)` as the GET route. Submit, then **refresh the page** | | |
| E | In DevTools → **Elements**, change one `option`'s `value` to `"Java"`, select it, and submit | | |
| F | In `guestbook.pug`, change `p= entry.message` to `p!= entry.message`, then submit the message `<b>hello</b> world` | | |

---

## Part 6 — Concept Check
Answer in 1–2 sentences.

**Q6.** What does `express.urlencoded()` do? What would `req.body` be without it?
______________________________________________

**Q7.** The HTML already has `required` on every field. Why do we **also** validate in `app.post()`?
______________________________________________

**Q8.** Why does the error path call `res.render()`, while the success path calls `res.redirect()`?
______________________________________________

**Q9.** Why do we pass `values` back to the template when there are errors?
______________________________________________

**Q10.** What's the difference between `p= entry.message` and `p!= entry.message`? Which should you use for user input?
______________________________________________

---

## Part 7 — Level Up (choose at least one)
- **🅰 Email field:** Add an `email` input (`type="email"`). On the server, show an error if it doesn't contain `@`. Don't display emails in the entries list.
- **🅱 Clear all:** Add a "Clear guestbook" button in its own small form that sends `POST /guestbook/clear`. Empty the array, then redirect.
  ❓ **Q11.** *Why should this be a `POST` form and not a link like `<a href="/guestbook/clear">`?*
  ______________________________________________
- **🅲 Success message:** Redirect to `/guestbook?signed=1` after a successful post. In the GET route, read `req.query.signed` and show "Thanks for signing!" when it's there.
- **🅳 Length limit:** Limit messages to 200 characters with `maxlength="200"` in Pug **and** a server check.

---

## 🔮 Coming Up Next
In Q5 you saw that every entry **disappears** when the server restarts, because the array lives in memory. Next time we'll store the guestbook in a **SQLite database**, so entries survive restarts and we can **edit** and **delete** them too.

---

## API Reference

### Express
| Method / Property | What it does | Example |
|---|---|---|
| `app.post(path, handler)` | Defines a route that responds to HTTP **POST** requests at `path`. A `GET` and a `POST` can share the same path. | `app.post('/guestbook', (req, res) => { ... });` |
| `express.urlencoded(options)` | Built-in middleware that reads form data from the request body and puts it in `req.body`. | `app.use(express.urlencoded({ extended: false }));` |
| `req.body` | An object holding the submitted form fields, keyed by each input's `name`. | `req.body.name` |
| `req.query` | An object holding the values in the URL's query string (after the `?`). | `/guestbook?signed=1` → `req.query.signed === '1'` |
| `res.redirect(path)` | Tells the browser to go to another URL (status **302**). The browser then makes a **GET** request there. | `res.redirect('/guestbook');` |
| `res.status(code).render(...)` | Renders a template with a specific status code, such as **400** for bad input. | `res.status(400).render('guestbook', { ... });` |

### HTML forms (written in Pug)
| Syntax | What it does | Example |
|---|---|---|
| `form(action method)` | Where to send the data, and which HTTP method to use. | `form(action="/guestbook" method="POST")` |
| `name` attribute | The key for the field in `req.body`. **A field without a `name` isn't sent at all.** | `input(name="name")` |
| `label(for="id")` | Connects a label to an input's `id`. Clicking the label focuses the input, and screen readers read it aloud. | `label(for="name") Name` |
| `input(value=variable)` | Fills an input with a variable. If the variable is `undefined`, Pug leaves the attribute out. | `input(name="name" value=values.name)` |
| `option(selected=boolean)` | Pre-selects an option when the expression is `true`. | `option(value=t selected=(t === values.topic))= t` |
| `textarea= variable` | A textarea's value goes **between** its tags, not in a `value` attribute. | `textarea(name="message")= values.message` |
| `required`, `maxlength` | Browser-side checks. Helpful for users, but **easy to bypass**. | `input(required maxlength="50")` |
| `=` vs `!=` | `=` escapes HTML (safe). `!=` outputs raw HTML (**dangerous** with user input). | `p= entry.message` |
| `//-` | A Pug comment that does **not** appear in the HTML. | `//- Show errors` |

📘 **Full docs:** [expressjs.com/en/api.html](https://expressjs.com/en/api.html) · [pugjs.org/language/attributes.html](https://pugjs.org/language/attributes.html) · [MDN: Sending form data](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data)

---

## Troubleshooting Cheat Sheet
| Problem | Likely cause |
|---|---|
| `TypeError: Cannot read properties of undefined (reading 'name')` | `express.urlencoded()` is missing, or it comes **after** your routes |
| `Cannot POST /guestbook` | No `app.post('/guestbook', ...)` route, or the form's `action` doesn't match the route path |
| A field is always empty on the server | The input is missing its `name` attribute, or the `name` is spelled differently than in `req.body` |
| Form data shows up in the URL | The form uses `method="GET"` (the default when `method` is missing) |
| Refreshing adds a duplicate entry | The POST route renders a page instead of redirecting |
| `values is not defined` / `errors is not defined` | A `res.render('guestbook', ...)` call is missing `values` or `errors` |
| Entries vanish when you restart | Expected! The data is stored in memory. (Next activity: databases.) |

---
---

# Answer Key

> Remove this section before handing the sheet out to students.

## Part 1 — How Forms Talk to Servers

**Q1.** **GET**, because the data is visible in the URL's query string. The two names are `q` and `color`.

## Part 2 — Build the Form Template

**Q2.** `name="name"` sets the key the value is sent under, so the server reads it as `req.body.name`. `value=values.name` fills the input with what the user typed earlier, so their input stays in the box when the form comes back with errors. On the first visit, `values` is `{}`, so `values.name` is `undefined` and Pug leaves the `value` attribute out entirely.

## Part 4 — DevTools

**Q3.** The POST returns **302 Found**, a redirect. Right after it, the browser makes a **GET `/guestbook`** request that returns **200** with the updated page. This happens because `res.redirect()` tells the browser to load the page again with a fresh GET request.
*(If a student's submission had errors, they'll see **400** and no redirect. Have them submit a valid entry.)*

**Q4.** The **form data**: each field's `name` and value, e.g. `name: Ana`, `topic: Pug`, `message: Hello class!`. "View source" shows it as `name=Ana&topic=Pug&message=Hello+class%21`. This is the URL-encoded format that `express.urlencoded()` reads.

**Q5.** **All entries are gone.** `entries` is a JavaScript array in the server's memory. When the process stops, the memory is freed, and the array starts empty on the next run. Saving data permanently needs a file or database. *(This leads into the next activity.)*

## Part 5 — Break It & Fix It

| # | Change | What happened | Fix |
|---|---|---|---|
| A | Remove `express.urlencoded()` | The page shows an error: `TypeError: Cannot read properties of undefined (reading 'name')`. Without the middleware, nothing reads the request body, so `req.body` is **`undefined`**. | Put the line back, **above** the routes. |
| B | Remove `name="message"` | Every submission fails with **"Message must be at least 5 characters."**, even with a long message. The browser doesn't send fields that have no `name`, so `req.body.message` is `undefined`. The Payload tab shows only `name` and `topic`. | Put `name="message"` back. |
| C | `method="GET"` | The URL becomes `/guestbook?name=Ana&topic=Pug&message=...`. The page reloads with an empty form, and **nothing is saved**. The browser sent a GET, so `app.get()` ran and `app.post()` never did. | Change it back to `method="POST"`. *(Point out that this data is now in the browser history.)* |
| D | `render` in place of `redirect` | Submitting works, but refreshing shows **"Confirm Form Resubmission"**. Confirming adds a **duplicate entry**, because refresh repeats the last request, which was the POST. | Restore `res.redirect('/guestbook')`. This is the **Post/Redirect/Get** pattern: after the redirect, the last request is a harmless GET. |
| E | Tamper with an option's value | The server returns **400** with **"Please choose a topic from the list."** The browser happily sent `topic=Java`, but the server check caught it. | Nothing to fix. This is the point: **anyone can change the HTML in their browser**, or skip it entirely with tools like `curl`. Only server-side checks can be trusted. |
| F | `p!=` with `<b>hello</b> world` | "hello" shows in **bold**. With `!=`, Pug inserts the text as raw HTML, so the browser treats the tags as real. With `=`, the page shows the literal text `<b>hello</b> world`. | Change back to `p= entry.message`. **Discussion:** if someone submits a `<script>` tag, it runs in the browser of *everyone* who views the guestbook. This attack is called **Cross-Site Scripting (XSS)**. Entries already saved will also render as HTML until you switch back to `=`. |

## Part 6 — Concept Check

**Q6.** `express.urlencoded()` is middleware that reads the URL-encoded body of a form POST (`name=Ana&topic=Pug`) and turns it into an object at `req.body` (`{ name: 'Ana', topic: 'Pug' }`). Without it, `req.body` is `undefined`.

**Q7.** Browser checks like `required` are only for convenience. They can be removed in DevTools (row E), skipped by old browsers, or bypassed by sending a request with `curl` or a script. The server is the only place you control, so it must check every input.

**Q8.** On error, there's nothing to save. We re-render the same form right away with the errors and the user's input, plus status 400. On success, the data has changed, so we **redirect**. The browser then loads the page with a GET, which means a refresh won't resubmit the form (row D).

**Q9.** So the user doesn't have to retype everything. The template fills each field from `values`, and only the problems need fixing.

**Q10.** `=` **escapes** special characters (`<` becomes `&lt;`), so user input always shows as plain text. `!=` outputs **raw, unescaped HTML**. Always use `=` for anything a user typed. Use `!=` only for HTML you wrote and trust.

## Part 7 — Level Up (sample solutions)

**🅰 Email field**

In `guestbook.pug`, after the name input:
```pug
    label(for="email") Email
    input#email(type="email" name="email" value=values.email required)
```
In `app.post()`:
```javascript
  const email = (req.body.email || '').trim();
  if (!email.includes('@')) errors.push('Please enter a valid email.');
```
Also add `email` to `values: { name, email, topic, message }` and to the saved entry. **Check for:** emails are **not** shown in the entries list.

**🅱 Clear all**

`guestbook.pug`, below the entries:
```pug
  form(action="/guestbook/clear" method="POST")
    button(type="submit") Clear guestbook
```
`server.js`:
```javascript
app.post('/guestbook/clear', (req, res) => {
  entries.length = 0; // empties the array in place
  res.redirect('/guestbook');
});
```
**Check for:** `entries.length = 0`, not `entries = []`. The array is declared with `const`, so reassigning it throws `TypeError: Assignment to constant variable.`

**Q11.** Links send **GET** requests, and GETs should never change data. Browsers, link previews, and search-engine crawlers can visit links on their own. One "prefetch" could wipe the guestbook. Actions that change data belong in **POST** forms.

**🅲 Success message**

In `app.post()`, replace the redirect:
```javascript
  res.redirect('/guestbook?signed=1');
```
In `app.get('/guestbook')`, add to the render data:
```javascript
    signed: req.query.signed === '1'
```
In `guestbook.pug`, below the `h2`:
```pug
  if signed
    p.success Thanks for signing!
```
**Note:** the error path's `res.render()` doesn't need `signed`. A missing variable is `undefined` in Pug, which counts as false, so the message simply doesn't show.

**🅳 Length limit**

`guestbook.pug`:
```pug
    textarea#message(name="message" rows="4" maxlength="200" required)= values.message
```
`app.post()`:
```javascript
  if (message.length > 200) errors.push('Message must be 200 characters or fewer.');
```
**Check for:** students did **both**. Have them test the server check by deleting `maxlength` in DevTools, as in row E.

## Complete `server.js` (core activity)
```javascript
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.locals.year = new Date().getFullYear();

app.use(express.urlencoded({ extended: false }));
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

// ----- Guestbook -----
const topics = ['HTML', 'CSS', 'Node.js', 'Express', 'Pug'];
const entries = [];

app.get('/guestbook', (req, res) => {
  res.render('guestbook', {
    title: 'Guestbook',
    topics,
    entries,
    errors: [],
    values: {}
  });
});

app.post('/guestbook', (req, res) => {
  const name = (req.body.name || '').trim();
  const topic = req.body.topic || '';
  const message = (req.body.message || '').trim();

  const errors = [];
  if (!name) errors.push('Name is required.');
  if (!topics.includes(topic)) errors.push('Please choose a topic from the list.');
  if (message.length < 5) errors.push('Message must be at least 5 characters.');

  if (errors.length > 0) {
    return res.status(400).render('guestbook', {
      title: 'Guestbook',
      topics,
      entries,
      errors,
      values: { name, topic, message }
    });
  }

  entries.unshift({ name, topic, message, date: new Date().toLocaleString() });
  res.redirect('/guestbook');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```
