# In-Class Activity: Text Tokenizer

**Topics:** DOM API, Event Handling, String Processing, Arrays, and CSS Flexbox  
**Estimated time:** 30–40 minutes

## Objective

Build a web application that accepts text from a user, separates it into individual tokens (words), and displays a report dynamically using the DOM API. This activity practices creating HTML elements with JavaScript, retrieving user input, responding to events, processing strings and arrays, and updating the document.

## Part 1 — Create the User Interface

Create three files in the same directory: `index.html`, `style.css`, and `script.js`.

In your HTML file, link the CSS and JavaScript files. Using **JavaScript and the DOM API**, dynamically create:

1. A `<textarea>` for entering text.
2. A `<button>` labeled **Submit**.
3. A `<div>` container for displaying the token report.

**Requirements:**

- Use `document.createElement()` to create the elements.
- Use DOM methods such as `appendChild()` to insert them into the document.
- Do not hardcode the textarea, button, or report container in the HTML markup.

### Hints

**Hint 1:** Create an element and assign its text:

```js
const heading = document.createElement("h2");
heading.textContent = "My Application";
```

**Hint 2:** Insert an element into the document:

```js
document.body.appendChild(heading);
```

## Part 2 — Center the User Interface

Use **CSS Flexbox** to center the application in the browser viewport.

**Requirements:**

- Center the interface horizontally and vertically.
- Place the textarea above the Submit button.
- Include spacing between elements.
- Display the report beneath the button when generated.

### Hints

**Hint 1:** Arrange child elements vertically:

```css
.container {
    display: flex;
    flex-direction: column;
}
```

**Hint 2:** Investigate these declarations and `min-height: 100vh`:

```css
justify-content: center;
align-items: center;
```

## Part 3 — Retrieve User Input

Write JavaScript that responds when the Submit button is clicked.

**Requirements:**

1. Register a `click` event listener using `addEventListener()`.
2. Retrieve the text using the textarea's `.value` property.
3. Remove leading and trailing whitespace using `trim()`.

### Hints

**Hint 1:** Register an event listener:

```js
element.addEventListener("click", function () {
    console.log("Clicked!");
});
```

**Hint 2:** Read a form control's current value:

```js
const message = inputElement.value;
console.log(message.trim());
```

## Part 4 — Tokenize the Text

Process the entered text into an array of tokens.

**Example input:**

```text
JavaScript makes web pages interactive
```

**Expected array:**

```js
["JavaScript", "makes", "web", "pages", "interactive"]
```

**Requirements:**

- Use the JavaScript `split()` method.
- Treat spaces, tabs, and newlines as separators.
- Do not produce empty tokens from consecutive whitespace.
- Empty or whitespace-only input must produce zero tokens.

### Hints

**Hint 1:** Split a string at a delimiter:

```js
const fruits = "apple,banana,orange";
const items = fruits.split(",");
```

**Hint 2:** Compare these approaches:

```js
"one   two".split(" ");
"one   two".split(/\s+/);
```

The expression `/\s+/` matches one or more whitespace characters. Consider the behavior of `"".split(/\s+/)`.

## Part 5 — Generate the Token Report

Use DOM methods to display the tokens below the Submit button.

**Example input:**

```text
JavaScript makes web pages interactive
```

**Expected report:**

```text
Token Report

Total tokens: 5

1. JavaScript
2. makes
3. web
4. pages
5. interactive
```

**Requirements:**

1. Display the number of tokens.
2. Display every token in its original order in a numbered list.
3. Construct the report using `createElement()`, `textContent`, and `appendChild()`.
4. Do not use `innerHTML` to generate the report.
5. Replace the previous report after each submission.

### Hints

**Hint 1:** Create list items from an array:

```js
const colors = ["red", "green", "blue"];
const list = document.createElement("ol");

colors.forEach(function (color) {
    const item = document.createElement("li");
    item.textContent = color;
    list.appendChild(item);
});
```

**Hint 2:** Remove existing report content before building a new report:

```js
container.replaceChildren();
container.appendChild(newElement);
```

## Part 6 — Test Your Application

| Test | Input | Expected token count |
|---|---|---:|
| 1 | `Hello world` | 2 |
| 2 | `one two three` | 3 |
| 3 | `one   two   three` | 3 |
| 4 | Empty textarea | 0 |
| 5 | Text containing tabs or newlines | Count all nonempty whitespace-separated tokens |

Submit different inputs in succession and verify that the newest report **replaces** the previous report.

### Hints

**Hint 1:** Inspect intermediate values using the browser console:

```js
console.log(tokens);
console.log(tokens.length);
```

**Hint 2:** An empty array has zero elements:

```js
const items = [];
console.log(items.length); // 0
```

## Bonus — Token Frequency

Count how many times each unique token appears.

**Input:**

```text
cat dog cat bird dog cat
```

**Expected frequency report:**

```text
cat: 3
dog: 2
bird: 1
```

Use a JavaScript object or `Map` to record frequencies. Matching is case-sensitive: `Cat` and `cat` count as different tokens.

### Hints

**Hint 1:** Store counts by key:

```js
const counts = {};
counts["apple"] = 1;
counts["apple"] += 1;
```

**Hint 2:** Iterate through an object's entries:

```js
Object.entries(counts).forEach(function ([word, count]) {
    console.log(word, count);
});
```

---

# Complete Solutions — Reference

The solutions below are incremental. Keep code from earlier parts unless a later part explicitly replaces it.

## Solution — Part 1: Create the User Interface

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text Tokenizer</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>
</body>
</html>
```

**script.js**

```js
const container = document.createElement("main");
container.className = "container";

const textarea = document.createElement("textarea");
textarea.placeholder = "Enter some text here...";
textarea.rows = 5;

const button = document.createElement("button");
button.textContent = "Submit";

const report = document.createElement("div");
report.className = "report";

container.appendChild(textarea);
container.appendChild(button);
container.appendChild(report);

document.body.appendChild(container);
```

The `defer` attribute runs the script after HTML parsing is complete.

## Solution — Part 2: Center the Interface

**style.css**

```css
body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Arial, sans-serif;
}

.container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 400px;
    max-width: 90%;
}

textarea {
    padding: 10px;
    font: inherit;
}

button {
    padding: 10px;
    cursor: pointer;
}

.report {
    overflow-wrap: anywhere;
}
```

The `body` centers the application within the viewport; the `.container` arranges its elements vertically.

## Solution — Part 3: Retrieve User Input

Append this listener to **script.js**:

```js
button.addEventListener("click", function () {
    const text = textarea.value.trim();
    console.log(text);
});
```

## Solution — Part 4: Tokenize the Text

**Replace** the Part 3 click listener with:

```js
button.addEventListener("click", function () {
    const text = textarea.value.trim();
    let tokens;

    if (text === "") {
        tokens = [];
    } else {
        tokens = text.split(/\s+/);
    }

    console.log(tokens);
    console.log("Total tokens:", tokens.length);
});
```

The empty-string check is necessary because splitting `""` would otherwise produce `[""]`, an array containing one empty string.

## Solution — Part 5: Generate the Report

Here is the **complete `script.js`**. Use it with the HTML and CSS from Parts 1 and 2.

```js
// Create the interface
const container = document.createElement("main");
container.className = "container";

const textarea = document.createElement("textarea");
textarea.placeholder = "Enter some text here...";
textarea.rows = 5;

const button = document.createElement("button");
button.textContent = "Submit";

const report = document.createElement("div");
report.className = "report";

container.appendChild(textarea);
container.appendChild(button);
container.appendChild(report);
document.body.appendChild(container);

// Read, tokenize, and display the text
button.addEventListener("click", function () {
    const text = textarea.value.trim();
    let tokens;

    if (text === "") {
        tokens = [];
    } else {
        tokens = text.split(/\s+/);
    }

    // Remove the previous report
    report.replaceChildren();

    const heading = document.createElement("h2");
    heading.textContent = "Token Report";

    const total = document.createElement("p");
    total.textContent = `Total tokens: ${tokens.length}`;

    const list = document.createElement("ol");

    tokens.forEach(function (token) {
        const item = document.createElement("li");
        item.textContent = token;
        list.appendChild(item);
    });

    report.appendChild(heading);
    report.appendChild(total);
    report.appendChild(list);
});
```

Using `textContent` displays user input as text instead of interpreting it as HTML.

## Solution — Part 6: Test the Application

Enter text containing multiple spaces and a newline:

```text
one   two
three
```

**Expected report:**

```text
Token Report

Total tokens: 3

1. one
2. two
3. three
```

Then clear the textarea and submit again.

**Expected report:**

```text
Token Report

Total tokens: 0
```

The previous list should disappear. Repeat the tests in Part 6 to confirm all counts.

## Solution — Bonus: Count Token Frequencies

In the Part 5 click listener, **append the following after** `report.appendChild(list);` and before the listener's closing `});`. A `Map` stores each unique token and its frequency.

```js
const counts = new Map();

// Count the occurrences of each token
for (const token of tokens) {
    const currentCount = counts.get(token) || 0;
    counts.set(token, currentCount + 1);
}

const frequencyHeading = document.createElement("h3");
frequencyHeading.textContent = "Token Frequency";

const frequencyList = document.createElement("ul");

for (const [word, count] of counts) {
    const item = document.createElement("li");
    item.textContent = `${word}: ${count}`;
    frequencyList.appendChild(item);
}

report.appendChild(frequencyHeading);
report.appendChild(frequencyList);
```

Because the click listener clears the report at the beginning, the frequency results are also replaced on every submission.

---

## Learning Outcomes

After completing this activity, students should be able to:

- Create and insert HTML elements dynamically using JavaScript.
- Retrieve text input through the DOM API.
- Register and respond to events using `addEventListener()`.
- Use `trim()` and `split()` to process strings.
- Iterate over arrays to generate DOM elements.
- Replace existing DOM content with an updated report.
- Use CSS Flexbox to center and organize a user interface.
