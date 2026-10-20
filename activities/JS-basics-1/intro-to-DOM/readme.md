# DOM Fundamentals + Hands-On Activity (Markdown)

## 1) What is the DOM?

The **Document Object Model (DOM)** is a tree-like, in-memory representation of your HTML page. Every element (like `<div>`, `<p>`, `<button>`) is a **node** in this tree. JavaScript can use the DOM **API** to read and update the page dynamically—change text, styles, attributes, or even add/remove elements.

* **Node**: a single point in the tree (elements, text nodes, comments, etc.).
* **Element node**: a node representing an HTML element (most common in everyday JS).
* **Relationships**:

  * `parentNode` / `parentElement` – the node that contains a node.
  * `children` / `childNodes` – nodes contained inside another node.
  * `firstElementChild`, `lastElementChild`, `nextElementSibling`, `previousElementSibling` – quick navigation helpers.

> Tip: DOM updates are immediate—what you change in JS is reflected in the browser right away.

---

## 2) Selecting Elements (DOM API)

Use **CSS selectors** to find elements in the DOM.

* **Single element**:

  ```js
  const title = document.querySelector('h1');          // first <h1>
  const special = document.querySelector('.special');  // first element with class="special"
  const item2 = document.querySelector('#item-2');     // element with id="item-2"
  ```

* **Multiple elements (NodeList)**:

  ```js
  const items = document.querySelectorAll('.item'); // all elements with class="item"
  items.forEach(el => console.log(el.textContent));
  ```

* **Other useful selectors**:
  `article > p`, `ul li:first-child`, `button[data-role="primary"]`, etc.

---

## 3) Modifying Elements & Styles

* **Text & HTML**:

  ```js
  title.textContent = 'Hello DOM';       // safe, plain text
  // title.innerHTML = '<em>Hi</em>';    // renders HTML — use sparingly for safety
  ```

* **Attributes & classes**:

  ```js
  const img = document.querySelector('img');
  img.setAttribute('alt', 'Cute marmot');
  img.classList.add('highlight');
  img.classList.toggle('hidden');
  ```

* **Inline styles** (quick demos; prefer CSS classes for larger apps):

  ```js
  document.body.style.backgroundColor = 'pink';
  document.body.style.setProperty('--accent', 'gold'); // CSS custom property if defined
  ```

* **Events**:

  ```js
  const btn = document.querySelector('#go');
  btn.addEventListener('click', () => {
    console.log('Clicked!');
  });
  ```

---

## 4) Hands-On Activity: Color Buttons via JavaScript

### Goal

Add **three buttons** to the page **via JavaScript** (not directly in HTML).
Each button has a unique `id` that equals its color (`pink`, `red`, `yellow`).
Clicking a button changes the `<body>` background to that color.

### Starter Files

Create two files:

**`index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>DOM Activity: Color Buttons</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    /* Minimal styles so you can "see" things */
    :root { --gap: 0.75rem; --btn-pad: 0.6rem 0.9rem; }
    body { font-family: system-ui, sans-serif; line-height: 1.4; margin: 2rem; transition: background-color 200ms ease; }
    #controls { display: flex; gap: var(--gap); flex-wrap: wrap; margin-block: 1rem; }
    button { padding: var(--btn-pad); border-radius: 0.5rem; border: 1px solid #ccc; cursor: pointer; }
    button:focus-visible { outline: 3px solid #000; outline-offset: 2px; }
  </style>
</head>
<body>
  <h1>DOM Activity: Create Buttons & Paint the Page</h1>
  <p id="description">We will create three buttons via JS and change the page background.</p>

  <div id="controls" aria-label="Background color controls"></div>

  <script src="script.js" defer></script>
</body>
</html>
```

**`script.js`** – start empty; you will write all logic here.

### Step-by-Step Instructions

1. **Select a parent container** for your buttons:

   ```js
   const controls = document.querySelector('#controls');
   ```

2. **Create a helper** to make a button with a given color:

   ```js
   function makeColorButton(color) {
     const btn = document.createElement('button');
     btn.id = color;                  // unique id equals the color (required)
     btn.textContent = color;         // visible label
     btn.setAttribute('type', 'button');
     btn.setAttribute('aria-pressed', 'false'); // accessibility hint
     return btn;
   }
   ```

3. **Create the three buttons via JS** and **append** to `#controls` (no hard-coded HTML buttons):

   ```js
   const colors = ['pink', 'red', 'yellow'];
   const buttons = colors.map(makeColorButton);
   buttons.forEach(btn => controls.appendChild(btn));
   ```

4. **Wire up click behavior**: clicking sets the body background.

   ```js
   function setBackground(color) {
     document.body.style.backgroundColor = color;
   }
   ```

5. **Add event listeners** for each button:

   ```js
   buttons.forEach(btn => {
     btn.addEventListener('click', () => {
       setBackground(btn.id); // id is the color name
       // Update pressed state for screen reader users
       buttons.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
     });
   });
   ```

6. **(Optional)** Set a default background on load:

   ```js
   setBackground('pink');
   buttons.find(b => b.id === 'pink').setAttribute('aria-pressed', 'true');
   ```

> Checkpoint: You should now see three JS-generated buttons labeled *pink*, *red*, *yellow*. Clicking each one paints the page.

---

## 5) DOM Traversal Quick Demo (Optional)

Try these in `script.js` after buttons exist:

```js
console.log('controls children:', controls.children);              // HTMLCollection of element children
console.log('first child:', controls.firstElementChild?.id);       // "pink"
console.log('second child via sibling:', controls.firstElementChild.nextElementSibling.id); // "red"
console.log('controls parent:', controls.parentElement.tagName);   // "BODY"
```

---

## 6) Challenges (Stretch Yourself!)

1. **Active style**: When a color is selected, add a class (e.g., `.active`) to the clicked button and remove it from others. In CSS, style `.active` with a bold font or thicker border.
2. **Event delegation**: Remove the individual listeners and attach **one** listener to `#controls` that reads `event.target.id` to determine the color.
3. **Keyboard shortcut**: Pressing `P`, `R`, or `Y` should set the background to pink, red, or yellow.
4. **Randomize**: Add a “Random” button (also created via JS) that sets a random pastel background.
5. **CSS variables**: Instead of setting `body.style.backgroundColor`, define `--bg` on `:root` and set `document.documentElement.style.setProperty('--bg', color)`. In CSS, use `body { background: var(--bg, white); }`.

---

## 7) Answers / Reference Solution

### `script.js` (one clean solution)

```js
// 1) Grab parent
const controls = document.querySelector('#controls');

// 2) Helper to create a button (id === color)
function makeColorButton(color) {
  const btn = document.createElement('button');
  btn.id = color;                       // requirement: unique id equals color
  btn.textContent = color;
  btn.type = 'button';
  btn.setAttribute('aria-pressed', 'false');
  return btn;
}

// 3) Create & append buttons via JS only (no static HTML buttons)
const colors = ['pink', 'red', 'yellow'];
const buttons = colors.map(makeColorButton);
buttons.forEach(btn => controls.appendChild(btn));

// 4) Painter
function setBackground(color) {
  document.body.style.backgroundColor = color;
}

// 5) Wire up listeners
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    setBackground(btn.id);
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
  });
});

// 6) Default state
setBackground('pink');
buttons.find(b => b.id === 'pink').setAttribute('aria-pressed', 'true');

// --- Optional: traversal demo
// console.log(controls.children, controls.firstElementChild?.id);
```

### Challenge Sketches

**Challenge 1 – Active style**

```css
/* Add to <style> in index.html */
button.active { border: 2px solid black; font-weight: 700; }
```

```js
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    setBackground(btn.id);
    buttons.forEach(b => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-pressed', String(b === btn));
    });
  });
});
```

**Challenge 2 – Event delegation**

```js
controls.addEventListener('click', (e) => {
  const target = e.target;
  if (!(target instanceof HTMLButtonElement)) return;
  const color = target.id;
  if (!color) return;
  setBackground(color);
  [...controls.querySelectorAll('button')].forEach(b => {
    b.classList.toggle('active', b === target);
    b.setAttribute('aria-pressed', String(b === target));
  });
});
```

**Challenge 3 – Keyboard shortcut**

```js
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  const map = { p: 'pink', r: 'red', y: 'yellow' };
  if (map[key]) {
    setBackground(map[key]);
    [...controls.querySelectorAll('button')].forEach(b => {
      b.classList.toggle('active', b.id === map[key]);
      b.setAttribute('aria-pressed', String(b.id === map[key]));
    });
  }
});
```

**Challenge 4 – Random pastel**

```js
function randomPastel() {
  const r = Math.floor((Math.random() * 127) + 128);
  const g = Math.floor((Math.random() * 127) + 128);
  const b = Math.floor((Math.random() * 127) + 128);
  return `rgb(${r}, ${g}, ${b})`;
}
const randomBtn = makeColorButton('random');
randomBtn.textContent = 'random';
controls.appendChild(randomBtn);
randomBtn.addEventListener('click', () => setBackground(randomPastel()));
```

**Challenge 5 – CSS variables**

```html
<!-- in <style> of index.html -->
:root { --bg: white; }
body { background: var(--bg); transition: background-color 200ms ease, background 200ms ease; }
```

```js
function setBackgroundVar(color) {
  document.documentElement.style.setProperty('--bg', color);
}
// then call setBackgroundVar(...) instead of setBackground(...)
```

---

## 8) Reflection (Exit Ticket)

* What’s the difference between **nodes** and **elements** in the DOM?
* When would you prefer **classList** vs. setting **style** directly?
* How does **event delegation** reduce the number of event listeners?

> Celebrate your wins. You just created UI **entirely via the DOM API**, with accessible states and clean logic—nice work! 🌈
