# REST Colors with Pug (Express) 

This activity extends the original **REST Colors** project into a small Express app that can do **two different jobs**:

- return **JSON** from API routes
- render **HTML pages** with **Pug** templates

That is a very useful next step after a basic REST lesson. You already know how to make routes and send JSON. Now you will learn how Express can also generate dynamic web pages on the server.

---

## Why use a template engine?

A template engine helps the server generate HTML by combining:

- a **template**
- some **data**

Instead of writing a separate HTML file for every color, we can make **one template** and reuse it for many values.

For example, the server can pass this object into a template:

```js
{ name: 'red', hex: '#ff0000' }
```

Then the template can generate a complete HTML page for that color.

This is useful because it teaches students the difference between:

- `res.json(...)` → send JSON data
- `res.sendFile(...)` → send one file directly
- `express.static(...)` → serve static assets like CSS or images
- `res.render(...)` → generate dynamic HTML from a template

---

## Learning Goals

By the end of this activity, you should be able to:

- explain what a template engine does
- install and configure **Pug** in an Express app
- understand the difference between static and dynamic content
- create a `views/` folder for templates
- pass variables from Express into Pug templates
- write basic Pug syntax for text, attributes, links, loops, and conditionals
- serve CSS using `express.static(...)`
- build routes that render dynamic HTML pages from the same in-memory data used by the API

---

## New Project File Structure

Create your project with a structure like this:

```text
colors-pug-app/
├── public/
│   └── styles.css
├── views/
│   ├── index.pug
│   ├── colors.pug
│   └── color-detail.pug
├── server.js
├── package.json
└── package-lock.json
```

### What each part is for

- `server.js` contains the Express server and route handlers
- `views/` contains Pug templates
- `public/` contains static files such as CSS
- `package.json` stores project metadata and dependencies

---

## Step 1 — Create the project

```bash
mkdir colors-pug-app
cd colors-pug-app
npm init -y
```

---

## Step 2 — Install dependencies

Install Express and Pug.

```bash
npm i express pug
```

Install nodemon as a dev dependency.

```bash
npm i -D nodemon
```

---

## Step 3 — Update `package.json`

Make sure your `scripts` section looks like this:

```json
{
  "name": "colors-pug-app",
  "version": "1.0.0",
  "type": "commonjs",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## Step 4 — Integrate Pug into Express

To use Pug, Express needs two important settings:

```js
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
```

### What these lines mean

- `view engine` tells Express what template engine to use
- `views` tells Express where the template files are stored

After that, you can render a template like this:

```js
res.render('colors', { colors });
```

This tells Express:

- find the file `views/colors.pug`
- pass it an object with a property named `colors`
- generate HTML from that template
- send the HTML to the browser

---

## Static content vs dynamic content

### 1. `res.json(...)`

Use this when you want to send JSON data.

```js
res.json(colors);
```

### 2. `res.sendFile(...)`

Use this when you want to send one specific file directly.

```js
res.sendFile(path.join(__dirname, 'public', 'hello.html'));
```

### 3. `express.static(...)`

Use this when you want Express to serve files automatically from a folder.

```js
app.use(express.static(path.join(__dirname, 'public')));
```

If your file is saved as `public/styles.css`, the browser can request:

```text
/styles.css
```

### 4. `res.render(...)`

Use this when you want the server to generate HTML dynamically.

```js
res.render('color-detail', { color });
```

This is the main new skill in this activity.

---

## Step 5 — Basic Pug syntax pointers

Pug is a template engine with a compact syntax. It uses **indentation** instead of opening and closing HTML tags.

### Plain tags

```pug
h1 Welcome
p This page shows all colors.
```

This becomes HTML like:

```html
<h1>Welcome</h1>
<p>This page shows all colors.</p>
```

### Nested elements

```pug
main
  h1 Colors
  p Choose a color below.
```

Indentation matters. The `h1` and `p` are inside the `main` element.

### Attributes

```pug
a(href='/colors') View all colors
```

### CSS classes and ids

```pug
main.container
  h1#title REST Colors
```

This means:

- `main.container` → `<main class="container">`
- `h1#title` → `<h1 id="title">`

### Variable output

Use `=` to output a variable.

```pug
h1= color.name
p= color.hex
```

### Text with interpolation

Use `#{...}` inside text.

```pug
p The selected color is #{color.name}.
```

### Loops

```pug
each color in colors
  li= color.name
```

### Conditionals

```pug
if color
  h2= color.name
else
  p Color not found.
```

### Inline style attributes

```pug
div.swatch(style=`background-color: ${color.hex}`)
```

That is useful in this project because we can display a live color swatch.

---

## Step 6 — Create the CSS file

Create `public/styles.css`.

```css
body {
  font-family: Arial, sans-serif;
  margin: 2rem;
  line-height: 1.5;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.color-list {
  list-style: none;
  padding: 0;
}

.color-item {
  margin: 0.75rem 0;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.swatch {
  width: 140px;
  height: 70px;
  border: 1px solid #333;
  border-radius: 8px;
  margin: 1rem 0;
}

a {
  text-decoration: none;
}
```

---

## Step 7 — Create the Pug templates

### `views/index.pug`

```pug
doctype html
html(lang='en')
  head
    meta(charset='UTF-8')
    meta(name='viewport', content='width=device-width, initial-scale=1.0')
    title REST Colors Home
    link(rel='stylesheet', href='/styles.css')
  body
    main.container
      h1 REST Colors with Pug
      p This project serves both JSON and HTML.

      ul
        li
          a(href='/api/colors') View the JSON API
        li
          a(href='/colors') View the rendered colors page
```

### `views/colors.pug`

```pug
doctype html
html(lang='en')
  head
    meta(charset='UTF-8')
    meta(name='viewport', content='width=device-width, initial-scale=1.0')
    title All Colors
    link(rel='stylesheet', href='/styles.css')
  body
    main.container
      h1 All Colors
      p Click a color name to see more details.

      ul.color-list
        each color in colors
          li.color-item
            a(href=`/colors/${color.name}`) #{color.name}
            |  — #{color.hex}

      p
        a(href='/') Back to home
```

### `views/color-detail.pug`

```pug
doctype html
html(lang='en')
  head
    meta(charset='UTF-8')
    meta(name='viewport', content='width=device-width, initial-scale=1.0')
    title= color.name
    link(rel='stylesheet', href='/styles.css')
  body
    main.container
      h1= color.name
      p Hex value: #{color.hex}
      div.swatch(style=`background-color: ${color.hex}`)

      p
        a(href='/colors') Back to all colors
```

---

## Step 8 — Routes to build

Your project should include both **API routes** and **page routes**.

### API routes

- `GET /api/colors` → return all colors as JSON
- `GET /api/colors/:name` → return one color as JSON

### Page routes

- `GET /` → render the home page
- `GET /colors` → render a page showing all colors
- `GET /colors/:name` → render a detail page for one color

---

## Passing parameters into templates

When Express renders a template, it can pass data into it as an object.

Example:

```js
res.render('colors', { colors });
```

Inside `colors.pug`, you can use the variable `colors` directly.

Another example:

```js
res.render('color-detail', { color });
```

Inside `color-detail.pug`, you can use `color.name` and `color.hex`.

This is one of the most important ideas in server-side rendering.

---

## Including CSS in a Pug template

To include a stylesheet, add a `link` tag in the `head` section.

```pug
link(rel='stylesheet', href='/styles.css')
```

That works because this line in `server.js` makes the `public/` folder available:

```js
app.use(express.static(path.join(__dirname, 'public')));
```

---

## Student Tasks

1. Create the full project structure.
2. Install Express and Pug.
3. Configure the app to use Pug.
4. Create the `public/styles.css` file.
5. Create the three Pug templates.
6. Add the API routes.
7. Add the page routes.
8. Start the server and test the following URLs:
   - `/`
   - `/api/colors`
   - `/colors`
   - `/colors/red`

---

## Check Your Understanding

Answer these questions after finishing the activity.

1. What is the difference between `res.json()` and `res.render()`?
2. What is the difference between `res.sendFile()` and `express.static()`?
3. Why do we use `app.set('view engine', 'pug')`?
4. What folder usually stores Pug templates?
5. How do you pass data from a route into a Pug template?
6. What Pug syntax is used for loops?
7. Why is indentation important in Pug?

---

## Full `server.js` Reference

Place this at the bottom of your project as `server.js`.

```js
'use strict';

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/** @type {{name:string, hex:string}[]} */
const colors = [
  { name: 'red', hex: '#ff0000' },
  { name: 'green', hex: '#00ff00' },
  { name: 'blue', hex: '#0000ff' }
];

const HEX_RE = /^#?[0-9a-fA-F]{6}$/;

function isValidHex(input) {
  return typeof input === 'string' && HEX_RE.test(input);
}

function normalizeHex(input) {
  const raw = input.startsWith('#') ? input.slice(1) : input;
  return `#${raw.toLowerCase()}`;
}

function normalizeName(name) {
  return String(name || '').trim().toLowerCase();
}

function findColorByName(name) {
  const normalized = normalizeName(name);
  return colors.find(color => color.name === normalized);
}

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/colors', (req, res) => {
  res.status(200).json(colors);
});

app.get('/api/colors/:name', (req, res) => {
  const color = findColorByName(req.params.name);

  if (!color) {
    return res.status(404).json({ error: 'Color not found' });
  }

  res.status(200).json(color);
});

app.get('/colors', (req, res) => {
  res.render('colors', { colors });
});

app.get('/colors/:name', (req, res) => {
  const color = findColorByName(req.params.name);

  if (!color) {
    return res.status(404).send('<h1>404 - Color not found</h1>');
  }

  res.render('color-detail', { color });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

---

## Optional Extensions

After you finish the basic version, try one or more of these:

- add a `POST /api/colors` route to create a new color
- add a form page that submits a new color
- create a shared layout template
- add a 404 Pug page instead of sending plain HTML text
- display more sample colors in the array

