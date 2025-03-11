# CSS Activity: Centering Elements with Flexbox

## Task 1: Centering a Paragraph Horizontally

### Instructions:
1. Create an `index.html` file and add the following HTML structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vibe Coding</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <p class="vibe-text">
            Vibe coding is an AI-dependent computer programming practice where a programmer describes a problem in a few sentences as a prompt to a large language model tuned for coding. Software can be quickly created and debugged while ignoring the details of the generated code. Vibe coding is claimed by its advocates to allow even amateur programmers to produce software without the extensive training and skills which coding previously needed. The term was introduced by Andrej Karpathy in February 2025.
        </p>
    </div>
</body>
</html>
```

2. In `styles.css`, write CSS to center the paragraph horizontally in the viewport.

**Hint:**  
- Set `display: flex` on `.container` and use `justify-content` to center the paragraph.  
- You may also use `margin: auto` techniques.  

---

## Task 2: Centering Two Paragraphs Using Flexbox

### Instructions:
1. Modify the `index.html` file to include a second paragraph as a sibling of the first.

```html
<body>
    <div class="container">
        <p class="vibe-text">
            Vibe coding is an AI-dependent computer programming practice where a programmer describes a problem in a few sentences as a prompt to a large language model tuned for coding. Software can be quickly created and debugged while ignoring the details of the generated code. Vibe coding is claimed by its advocates to allow even amateur programmers to produce software without the extensive training and skills which coding previously needed. The term was introduced by Andrej Karpathy in February 2025.
        </p>
        <p class="tools-text">
            Tools for vibe coding: Vibe coding relies on AI tools such as Replit Agent, Cursor Composer, Pythagora, Bolt, Lovable, and Cline, that build on large language models from companies including OpenAI or Anthropic.
        </p>
    </div>
</body>
```

2. Use `display: flex` to center the two paragraphs **horizontally and vertically** inside the viewport.

   - **First Layout (Row Centering)**
     - Use `flex-direction: row;` to align them in a row.
     - Center them using `justify-content` and `align-items`.

   - **Second Layout (Column Centering)**
     - Change `flex-direction` to `column` to stack them vertically.
     - Ensure they remain centered.

**Hint:**  
- Use `height: 100vh` on `.container` to make it cover the viewport.
- Try `align-items: center;` and `justify-content: center;` to perfectly center elements.

### Additional Challenge:
- Add `gap` between the two paragraphs when they are in a row layout.
- Apply `max-width` and `text-align: center;` to improve readability.

---

### Resources:
- [CSS Flexbox Guide (MDN)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
- [CSS Centering Techniques](https://css-tricks.com/centering-css-complete-guide/)

Happy Coding! 🎨🚀