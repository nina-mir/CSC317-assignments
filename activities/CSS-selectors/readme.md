# CSS Selectors Playground — Activity Page

Welcome! In this hands‑on activity you’ll practice **basic CSS selectors**: element/tag, class (`.`), ID (`#`), and the `:first-child` pseudo-class. You’ll also try a few fun challenges with more advanced selectors at the end. 🌈

You’ll work on the included HTML page `selectors-activity.html`. Your job is to write CSS rules (in the `<style>` tag that’s already in the file) so specific parts of the page change appearance based on the selector being practiced.

---

## 🎯 Learning goals
- Target elements by **type**, **class**, and **ID**
- Use **`:first-child`** to select only the first element among siblings
- Read & reason from HTML to craft the **right selector**
- Stretch: practice **combinators** and **attribute/pseudo-class** selectors

---

## 🧰 What you need
- A code editor
- A web browser
- The file: `selectors-activity.html` (open it in the browser and refresh as you edit)

> All edits go inside the `<style>` block in the HTML (search for `/* TODO: your CSS goes here */`).

---

## 📦 Starter structure (what you’ll be styling)
Key targets that appear in the HTML:
- Elements: `h1`, `p`, `li`, `section`, `article`
- Classes: `.card`, `.tag`, `.btn`, `.note`, `.featured`
- IDs: `#welcome`, `#about`, `#shop`
- Useful structure for `:first-child`: list items in `#shop .products`
- Extras for challenges: `data-difficulty` attributes on `.challenge` items

---

## ✅ Tasks

### Task 1 — Element (type) selector
**Goal:** Make all headings (`h1`) a different color and center them.

**Hint:** Element selectors are just the tag name.
```css
/* example pattern */
h1 { /* styles */ }
```

### Task 2 — Class selector
**Goal:** Give every `.card` a soft border, padding, and rounded corners. Also add a tiny shadow.

**Hint:** Class selectors start with a dot.
```css
.card {
  /* border, padding, border-radius, box-shadow */
}
```

### Task 3 — ID selector
**Goal:** Make the `#welcome` section stand out with a subtle background and larger text for its first paragraph only.

**Hints:**
- IDs start with `#`
- Combine ID + descendant element (e.g., `#welcome p`)
```css
#welcome { /* background */ }
#welcome p { /* larger text */ }
```

### Task 4 — The `:first-child` pseudo-class
**Goal:** In the product list under **Shop**, style **only the first** product differently (e.g., bold name or a different background).

**Hint:** Scope to the list first, then select the first list item.
```css
#shop .products li:first-child { /* styles */ }
```

### Task 5 — Combine selectors
**Goal:** Style only `.tag` elements **inside** a `.card` to look like rounded chips.

**Hint:** Use a **descendant** or **child** combinator.
```css
.card .tag { /* chip styles */ }
```

### Task 6 — Buttons hover
**Goal:** Make `.btn` change appearance on hover (e.g., darker background, pointer cursor).

**Hint:** Use `:hover`.
```css
.btn:hover { /* styles */ }
```

---

## ⚡ Challenges (spicy, but tasty)

1) **Attribute selector:** Color-code challenges by difficulty.
```css
/* Select by data attribute */
.challenge[data-difficulty="easy"] { /* green-ish */ }
.challenge[data-difficulty="medium"] { /* orange-ish */ }
.challenge[data-difficulty="hard"] { /* red-ish */ }
```

2) **Direct-child combinator (`>`):** Style only `h3` that are **direct children** of `.card`.
```css
.card > h3 { /* styles */ }
```

3) **Adjacent-sibling combinator (`+`):** Add extra spacing **only** when a `.note` immediately follows a `.card`.
```css
.card + .note { /* margin-top */ }
```

4) **Negation (`:not`) + groups:** Dim all list items in `#shop .products` **except** the first one.
```css
#shop .products li:not(:first-child) { /* dim styles */ }
```

5) **Nth-child:** Zebra stripe the review list (`#about .testimonials li`).
```css
#about .testimonials li:nth-child(even) { /* stripe */ }
```

---

## 🧪 Quick visual targets (examples)
- Cards have padding, rounded corners, and a gentle shadow.
- The first product looks “featured” compared to the rest.
- Buttons feel clickable on hover.
- Difficulty tags show distinct colors.

---

## 🧯 Troubleshooting
- Changes not showing? Hard refresh (`Ctrl/Cmd + Shift + R`).
- Selector not matching? Inspect element in DevTools and confirm the element, class, and parent structure.
- Specificity issues? IDs (`#`) > classes (`.`) > elements. If two rules fight, the more specific wins.

---

## ✅ Optional “peek” solutions (mini)
> Try first on your own! Then compare with these minimal examples.

```css
/* Task 1 */
h1 { color: #4c3cff; text-align: center; }

/* Task 2 */
.card {
  border: 1px solid #e4e4e7;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

/* Task 3 */
#welcome { background: #f5f7ff; }
#welcome p { font-size: 1.1rem; }

/* Task 4 */
#shop .products li:first-child {
  background: #fff7e6;
  font-weight: 600;
}

/* Task 5 */
.card .tag {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: #eef2ff;
  font-size: 0.8rem;
}

/* Task 6 */
.btn { transition: all 160ms ease; }
.btn:hover { filter: brightness(0.92); cursor: pointer; }

/* Challenges */
.challenge[data-difficulty="easy"] { background: #ecfdf5; }
.challenge[data-difficulty="medium"] { background: #fff7ed; }
.challenge[data-difficulty="hard"] { background: #fef2f2; }

.card > h3 { text-decoration: underline; }
.card + .note { margin-top: 1rem; }
#shop .products li:not(:first-child) { opacity: 0.85; }
#about .testimonials li:nth-child(even) { background: #fafafa; }
```