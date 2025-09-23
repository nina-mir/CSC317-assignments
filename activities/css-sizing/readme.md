# CSS Sizing (MDN Summary)

https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Sizing


## Key Concepts
- **Intrinsic size**: The natural size of an element (e.g., an image’s dimensions, text content defining height).
- **Extrinsic size**: A size explicitly set via CSS (`width`, `height`).

## Sizing Methods
1. **Intrinsic (Natural) Size**
   - Images: use their own file dimensions unless changed with CSS/HTML.
   - Empty `<div>`: no height until content is added.

2. **Setting a Specific Size**
   - Use `width` and `height` in CSS.
   - Danger: Content can overflow if fixed height is too small.
   - **Percentages**: Relative to parent element’s size.

3. **Min/Max Constraints**
   - `min-width`, `min-height`: Smallest allowed size.
   - `max-width`, `max-height`: Largest allowed size.
   - Useful for responsive designs (e.g., `max-width: 100%` keeps images from overflowing containers).

4. **Viewport Units**
   - Units based on browser window:
     - `vw` = 1% of viewport width.
     - `vh` = 1% of viewport height.
     - `vmin` / `vmax`: relative to the smaller/larger dimension.
   - Common for full-screen sections or responsive text sizing.

## Summary
- Use intrinsic size when possible.
- Use extrinsic sizes carefully (avoid overflow).
- Combine `min-` and `max-` properties for flexible layouts.
- Viewport units are powerful for responsive and adaptive design.

---

# CSS Sizing & Selectors Activity Page 🎨

Welcome to today’s activity! We’ll explore how **percentage values**, **viewport units**, **relative units (em vs rem)**, and the **child combinator (`>`)** behave in CSS.  
Each task comes with **important facts, examples, and coding challenges**. Have fun experimenting!

---

## 🌟 Task 1: Percentage-based Padding & Margin
### Key Facts
- `%` values for `padding` and `margin` are **relative to the parent element’s width** (not height).
- This means that even vertical padding (top/bottom) is calculated based on the parent’s **width**.

### Example
```html
<div class="parent">
  <div class="child">Child</div>
</div>

<style>
.parent {
  width: 400px;
  background: lightblue;
}
.child {
  margin-top: 10%;  /* 10% of parent’s WIDTH, not height */
  padding: 5%;      /* 5% of parent’s WIDTH */
  background: coral;
}
</style>
````

### Challenge

* Change the `.parent` width from `400px` → `800px`.
* Observe how the child’s margin & padding grow horizontally **and vertically**.
* Why does vertical spacing depend on width? 🤔

---

## 🌟 Task 2: Viewport Units (vw/vh)

### Key Facts

* `1vw` = 1% of **viewport width** (browser window width).
* `1vh` = 1% of **viewport height**.
* Great for full-screen layouts and responsive sections.
* `vmin` and `vmax`: relative to the smaller or larger dimension of viewport.

### Example

```html
<div class="hero">Hello, Viewport!</div>

<style>
.hero {
  width: 50vw;   /* half of viewport width */
  height: 30vh;  /* 30% of viewport height */
  background: mediumseagreen;
  color: white;
  font-size: 5vh; /* scales with viewport height */
}
</style>
```

### Challenge

* Resize the browser window.
* Notice how the box and text scale dynamically.
* Compare this with using `%` instead of `vw/vh`.

---

## 🌟 Task 3: em vs rem

### Key Facts

* `em`: Relative to the **font-size of the parent element**.
* `rem`: Relative to the **root (`html`) element font-size**.
* Useful for **scalable typography**, but can behave differently in nested elements.

### Example

```html
<div class="outer">
  Outer text
  <div class="inner">Inner text</div>
</div>

<style>
html { font-size: 16px; }
.outer { font-size: 20px; }
.inner {
  font-size: 1.5em;  /* relative to .outer → 20px * 1.5 = 30px */
  margin: 2rem;      /* relative to root html → 16px * 2 = 32px */
}
</style>
```

### Challenge

* Change the `.outer` font-size to `10px`.
* Observe how `.inner` text shrinks with `em` but margin stays consistent with `rem`.
* Why might designers prefer `rem` for spacing?

---

## 🌟 Task 4: Child Combinator Selector (`>`)

### Key Facts

* `A > B` selects **direct children** of `A`.
* Does NOT apply to grandchildren or deeper descendants.
* Helps target specific nested structures.

### Example

```html
<ul class="menu">
  <li>Home</li>
  <li>About
    <ul>
      <li>Team</li>
      <li>History</li>
    </ul>
  </li>
</ul>

<style>
.menu > li {
  color: red; /* Only top-level items */
}
</style>
```

### Challenge

* Add styles so that nested `<li>` (like "Team" and "History") appear **blue**, but keep only direct children of `.menu` red.
* What happens if you change `>` to a space (`.menu li`)?

<hr>







# ✅ Challenge Answers

## 🌟 Task 1: Percentage-based Padding & Margin

* **What happens when parent width changes?**

  * If `.parent` goes from `400px` → `800px`, the `margin-top: 10%` changes from:

    * `400px * 10% = 40px` → `800px * 10% = 80px`
  * The `padding: 5%` changes from:

    * `400px * 5% = 20px` → `800px * 5% = 40px`
* **Why does vertical spacing depend on width?**

  * By CSS spec, percentage-based paddings and margins are **always calculated relative to the parent’s width**, not height.
  * This can feel unintuitive but ensures predictable scaling in responsive layouts.

---

## 🌟 Task 2: Viewport Units (vw/vh)

* **What happens on resize?**

  * `width: 50vw` → always half the viewport width, regardless of parent.
  * `height: 30vh` → always 30% of viewport height.
  * `font-size: 5vh` → grows/shrinks with viewport height.
* **Comparison with %:**

  * `%` values depend on the **parent element’s dimensions**, while `vw/vh` values depend on the **viewport (browser window)**.
  * Example: if parent is 800px wide inside a 1600px viewport:

    * `50%` = 400px (half of parent).
    * `50vw` = 800px (half of viewport).

---

## 🌟 Task 3: em vs rem

* **With `.outer { font-size: 20px }`**:

  * `.inner { font-size: 1.5em }` → `20px * 1.5 = 30px`
  * `.inner { margin: 2rem }` → `16px * 2 = 32px` (root is always 16px unless changed).
* **If `.outer { font-size: 10px }`:**

  * `.inner { font-size: 1.5em }` → `10px * 1.5 = 15px` (shrinks).
  * `.inner { margin: 2rem }` → `32px` (stays the same, since based on root).
* **Takeaway:**

  * `em` cascades with parent font-size (good for relative typography).
  * `rem` stays consistent across document (good for spacing, predictable sizing).

---

## 🌟 Task 4: Child Combinator Selector (`>`)

* Original CSS:

  ```css
  .menu > li {
    color: red;
  }
  ```

  → Styles only the top-level `<li>` ("Home" and "About").
* To style nested `<li>` differently:

  ```css
  .menu > li {
    color: red;  /* Top-level only */
  }

  .menu li li {
    color: blue; /* Nested li */
  }
  ```
* **If you replace `>` with a space (`.menu li`)**:

  * All `<li>` elements (both top-level and nested) turn red.
  * The distinction between parent and child levels is lost.

---

# 🎯 Summary of Answers

* Task 1: Vertical % padding/margin still based on **parent width**.
* Task 2: `%` is relative to **parent**, `vw/vh` relative to **viewport**.
* Task 3: `em` changes with parent font-size, `rem` stays consistent with root.
* Task 4: `>` targets **direct children only**, while a space selects **all descendants**.

---
