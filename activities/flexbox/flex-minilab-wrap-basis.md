# 📦 Flexbox Mini-Lab: `flex-wrap`, `flex-grow`, `flex-shrink`, `flex-basis`

Learn how flex items wrap and how they share space. You’ll work with **numbered red squares** inside a flex container and change only the CSS to complete each task. Answers are at the end.

---

## ✅ Learning Goals
- Use `flex-wrap` (`nowrap`, `wrap`, `wrap-reverse`)
- Understand the **flex item sizing trio**: `flex-grow`, `flex-shrink`, `flex-basis`
- Use the `flex` shorthand: `flex: <grow> <shrink> <basis>`

---

## 🧰 Starter File (copy into `index.html`)

> Keep the HTML as-is. You’ll only edit CSS.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Flexbox Sizing Lab</title>
  <style>
    /* --- Base styles (edit below in tasks) --- */
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; margin: 20px; }

    .container {
      border: 2px solid #222;
      /* Try changing this width per task to see wrapping/shrinking */
      width: 420px;
      min-height: 220px;
      display: flex;
      /* Defaults you will change: */
      /* flex-wrap: nowrap; */
      /* gap: 10px; */
      /* justify-content: flex-start; */
      /* align-items: flex-start; */
      padding: 10px;
    }

    .square {
      width: 90px;           /* square base width (overridden by flex-basis when set) */
      height: 90px;          /* keep squares square */
      background: #e11;      /* red */
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font: 700 20px/1 system-ui, sans-serif;
      border-radius: 6px;
      /* Defaults you will change: */
      /* flex: 0 1 auto; */  /* (grow 0, shrink 1, basis auto) */
    }
  </style>
</head>
<body>
  <h1>Flexbox Sizing Lab</h1>

  <div class="container">
    <div class="square">1</div>
    <div class="square">2</div>
    <div class="square">3</div>
    <div class="square">4</div>
    <div class="square">5</div>
    <div class="square">6</div>
    <div class="square">7</div>
    <div class="square">8</div>
  </div>

  <!-- Tip: duplicate or remove squares to experiment more -->
</body>
</html>
````

---

## ℹ️ Quick Facts (read me!)

* **`flex-basis`** sets the **starting size** of an item along the main axis (overrides `width`/`height` for flex sizing when not `auto`).
* **`flex-grow`** controls how much **extra free space** an item gets (ratio with siblings).
* **`flex-shrink`** controls how much an item **shrinks** when there isn’t enough space (ratio with siblings).
* **Shorthand**: `flex: <grow> <shrink> <basis>` (e.g., `flex: 1 0 120px;`).
* **`flex-wrap`** determines whether items **wrap to new lines** (`nowrap` default, `wrap`, `wrap-reverse`).

---

## 🧪 Tasks

### Task 1 — Make the items wrap

**Goal:** Let the red squares move to a new row when they don’t fit.

* Set the container to **wrap**.
* Add a small gap for readability.

**Hint:** `flex-wrap: wrap;` and `gap: 10px;`.

---

### Task 2 — Exactly 3 squares per row

**Goal:** Arrange the squares so each row shows exactly **3 squares** (and the last row has the remaining items).

* Keep `flex-wrap: wrap`.
* Use `flex-basis` to make each item 1/3 of the row, minus the gaps.

**Hint:** `flex-basis: calc(33.333% - 10px);` when using `gap: 10px;` (items + gaps must fit the row).

---

### Task 3 — Make item **1** take double space (growing)

**Goal:** First item grows to take **twice** as much extra space as the others on each row.

* Keep Task 2 layout (3 per row).
* Give all squares a base: `flex: 1 1 calc(33.333% - 10px);`
* Then make **only item 1** grow faster.

**Hint:** Use a larger `flex-grow` on `.square:nth-child(1)` (e.g., `flex: 2 1 ...`).

---

### Task 4 — Prevent item **3** from shrinking

**Goal:** When the container becomes narrow (reduce container width to test), all items may shrink—but **item 3 should keep its basis size**.

* Keep wrapping turned **on**.
* Give all items a basis (e.g., `120px`).
* Turn **off shrinking** on item 3.

**Hint:** `flex: 1 0 120px;` (shrink = 0) for item 3; others can be `1 1 120px;`.

---

### Task 5 — Wrap in reverse

**Goal:** Make wrapping happen in the **reverse** direction (new rows appear **above** the first row).

**Hint:** `flex-wrap: wrap-reverse;`.

---

### Task 6 (Challenge) — Responsive “fill the row” cards

**Goal:** Create a layout where squares fill the row nicely from **2 to 4 per row** depending on width.

* Keep wrap **on** and use a flexible basis **min**.
* Allow growing to fill leftover space.

**Hint:** Use `flex: 1 1 160px;` (basis = 160px; items wrap as needed; growing fills each row evenly).

---

## 💬 Tips & Troubleshooting

* If `width` and `flex-basis` both exist, **`flex-basis` wins** (unless `flex-basis: auto`).
* If things don’t wrap, check you didn’t leave `flex-wrap: nowrap`.
* If items aren’t square, ensure **both** `height` and either `width` or `flex-basis` yield a square.
* `gap` is easier than margins for spacing in flex layouts.
* Use borders on container and items while debugging layout.

---

## ✅ Answers

> Below are *one* set of correct solutions. Many variations are valid; the key is the concept.

### Answer — Task 1 (wrap + spacing)

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
```

### Answer — Task 2 (3 per row)

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Each item roughly 1/3 width minus the gap */
.square {
  /* grow 0 (don’t take extra), shrink 1, basis = third of row */
  flex: 0 1 calc(33.333% - 10px);
  height: 90px; /* keep square */
}
```

### Answer — Task 3 (item 1 grows double)

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Default items: can grow, can shrink, start at a third */
.square {
  flex: 1 1 calc(33.333% - 10px);
  height: 90px;
}

/* Item 1 gets double the extra space compared to others on its row */
.square:nth-child(1) {
  flex: 2 1 calc(33.333% - 10px);
}
```

### Answer — Task 4 (prevent item 3 from shrinking)

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  /* try making the container smaller to test, e.g., width: 320px; */
}

/* All items start at 120px and may grow/shrink */
.square {
  flex: 1 1 120px;  /* grow 1, shrink 1, basis 120px */
  height: 120px;
}

/* Item 3 should keep its basis — turn off shrinking */
.square:nth-child(3) {
  flex: 1 0 120px;  /* grow 1, shrink 0, basis 120px */
}
```

### Answer — Task 5 (wrap in reverse)

```css
.container {
  display: flex;
  flex-wrap: wrap-reverse; /* new rows appear on top */
  gap: 10px;
}
```

### Answer — Task 6 (responsive fill)

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Basis suggests ~160px, but items may grow to fill each row evenly */
.square {
  flex: 1 1 160px; /* grow 1, shrink 1, basis 160px */
  height: 160px;
}
```

---

## 🧠 Recap

* **Use `flex-wrap`** to let items move to new lines (`wrap`, `wrap-reverse`).
* **Space distribution** is about **grow** (extra space) and **shrink** (too little space).
* **`flex-basis`** sets the starting size along the main axis and typically overrides `width`.
* The **shorthand** `flex: GROW SHRINK BASIS` keeps your code readable and intentional.

Happy flexing! 🎯

