# 🎨 Flexbox Basics Activity – 3 Red Squares

In this activity, you will learn the **basics of flexbox layout** by arranging **three red squares** (labeled 1, 2, and 3) in different ways.  
You will practice using:

- `display: flex`
- `justify-content`
- `align-items`

---

## 🟢 Starter Code

Copy this into an `index.html` file. Notice that the HTML only contains the **three squares** inside a container – no CSS yet!

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Flexbox Activity</title>
  <style>
    .container {
      border: 2px solid black;
      height: 300px;
      width: 100%;
    }

    .square {
      width: 60px;
      height: 60px;
      background-color: red;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      margin: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="square">1</div>
    <div class="square">2</div>
    <div class="square">3</div>
  </div>
</body>
</html>
````

---

## ✨ Activity Tasks

### Task 1 – Put Squares in a Row

👉 Change the container so the three squares line up horizontally.

**Hint:** Add `display: flex;` to `.container`.

---

### Task 2 – Center the Squares Horizontally

👉 Use `justify-content` to center all three squares horizontally inside the container.

**Hint:** Try `justify-content: center;`.

---

### Task 3 – Move Squares to the Right

👉 Change the `justify-content` so the squares sit at the far right of the container.

**Hint:** Use `flex-end`.

---

### Task 4 – Put Squares in a Column

👉 Stack the squares vertically.

**Hint:** Add `flex-direction: column;` to `.container`.

---

### Task 5 – Center Squares Vertically and Horizontally

👉 Make the three squares appear in the middle of the container (both vertically and horizontally).

**Hint:** Combine `justify-content: center;` and `align-items: center;`.

---

## 💡 Tips

* `justify-content` controls **horizontal alignment** (in a row).
* `align-items` controls **vertical alignment** (in a row).
* If you switch to `flex-direction: column;`, the meanings flip:

  * `justify-content` = vertical alignment
  * `align-items` = horizontal alignment

---

## ✅ Answers

### Task 1

```css
.container {
  display: flex;
}
```

### Task 2

```css
.container {
  display: flex;
  justify-content: center;
}
```

### Task 3

```css
.container {
  display: flex;
  justify-content: flex-end;
}
```

### Task 4

```css
.container {
  display: flex;
  flex-direction: column;
}
```

### Task 5

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

---