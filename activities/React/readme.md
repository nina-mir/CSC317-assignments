````markdown
# Intro to React: Build a Simple Static Website

This manual uses **React + Vite**, the modern recommended beginner setup for React projects. Vite provides a fast development server and simple project scaffolding. Node.js is required because it includes `npm`, which installs and runs project tools. :contentReference[oaicite:0]{index=0}

---

## 1. What You Will Build

You will create a simple React website with:

- A title
- A short explanation
- A text input
- Live text output that updates as the user types

This introduces one of React’s most important ideas: **state**.

---

## 2. What Is React?

React is a JavaScript library for building user interfaces.

Instead of writing one large HTML file, React lets you build your page using small reusable pieces called **components**.

Example:

```jsx
function Header() {
  return <h1>Welcome to My Website</h1>;
}
````

A **component** is just a JavaScript function that returns JSX.

---

## 3. What Is JSX?

JSX looks like HTML, but it is written inside JavaScript.

Example:

```jsx
const message = "Hello React!";

return <h1>{message}</h1>;
```

The curly braces `{}` let you place JavaScript values inside JSX.

---

# 4. Install the Required Tools

## Mac Instructions

### Step 1: Install Node.js

Go to the official Node.js website and download the **LTS** version:

```text
https://nodejs.org
```

The LTS version is the stable version recommended for most users. ([Node.js][1])

### Step 2: Verify Node and npm

Open **Terminal** and run:

```bash
node -v
npm -v
```

You should see version numbers.

Example:

```bash
v24.15.0
11.14.1
```

Your numbers may be different. That is okay.

---

## Windows Instructions

### Step 1: Install Node.js

Go to:

```text
https://nodejs.org
```

Download the **Windows Installer** for the **LTS** version.

During installation, keep the default options selected.

### Step 2: Verify Node and npm

Open **Command Prompt**, **PowerShell**, or **Windows Terminal**.

Run:

```bash
node -v
npm -v
```

If both commands show version numbers, you are ready.

---

# 5. Create a New React App

React projects are commonly created with Vite. Vite’s official guide uses `npm create vite@latest` to scaffold new projects. ([vitejs][2])

In your terminal, run:

```bash
npm create vite@latest intro-react-site -- --template react
```

Then move into the project folder:

```bash
cd intro-react-site
```

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

You should see something like:

```text
Local: http://localhost:5173/
```

Open that address in your browser.

---

# 6. Open the Project in VS Code

In the terminal, from inside your project folder, run:

```bash
code .
```

If that command does not work, open VS Code manually and choose:

```text
File > Open Folder
```

Then select the `intro-react-site` folder.

---

# 7. Understanding the Project Files

Important files:

```text
intro-react-site/
├── index.html
├── package.json
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── App.css
```

## `src/main.jsx`

This file starts the React app and places it on the page.

## `src/App.jsx`

This is the main component you will edit.

## `src/App.css`

This file controls the styling for `App.jsx`.

---

# 8. Replace the Code in `App.jsx`

Open:

```text
src/App.jsx
```

Delete everything inside the file and replace it with this:

```jsx
import { useState } from "react";
import "./App.css";

function App() {
  const [userText, setUserText] = useState("");

  return (
    <main className="page">
      <section className="card">
        <h1>My First React Website</h1>

        <p>
          Type something in the input box below. React will update the page as
          you type.
        </p>

        <label htmlFor="textInput">Enter some text:</label>

        <input
          id="textInput"
          type="text"
          value={userText}
          onChange={(event) => setUserText(event.target.value)}
          placeholder="Type here..."
        />

        <h2>You typed:</h2>
        <p className="output">{userText}</p>
      </section>
    </main>
  );
}

export default App;
```

---

# 9. Replace the Code in `App.css`

Open:

```text
src/App.css
```

Replace the contents with:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #f4f4f8;
  color: #222;
}

.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.card {
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

h1 {
  margin-top: 0;
}

label {
  display: block;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 0.5rem;
}

input:focus {
  outline: none;
  border-color: #646cff;
}

.output {
  min-height: 2rem;
  padding: 1rem;
  background: #f0f0ff;
  border-radius: 0.5rem;
  font-size: 1.2rem;
}
```

---

# 10. What Is `useState`?

This line imports `useState`:

```jsx
import { useState } from "react";
```

`useState` lets a component remember information.

This line creates a state variable:

```jsx
const [userText, setUserText] = useState("");
```

It means:

```text
userText     = the current value
setUserText  = the function used to update the value
useState("") = the starting value is an empty string
```

So at first:

```jsx
userText
```

is:

```text
""
```

When the user types, this runs:

```jsx
onChange={(event) => setUserText(event.target.value)}
```

That updates the state.

When state changes, React automatically re-renders the component, so this part updates:

```jsx
<p className="output">{userText}</p>
```

---

# 11. What Are Hooks?

Hooks are special React functions that let components use React features.

`useState` is a hook.

Hooks usually start with the word `use`.

Common hooks include:

```jsx
useState
useEffect
useRef
useContext
```

For now, focus on `useState`.

A hook should be called near the top of your component:

```jsx
function App() {
  const [userText, setUserText] = useState("");

  return (
    <main>
      <p>{userText}</p>
    </main>
  );
}
```

Do not put hooks inside `if` statements, loops, or nested functions.

---

# 12. Understanding the Input

This input is called a **controlled input**:

```jsx
<input
  type="text"
  value={userText}
  onChange={(event) => setUserText(event.target.value)}
/>
```

It is “controlled” because React controls its value.

The flow is:

```text
User types
↓
onChange runs
↓
setUserText updates state
↓
React re-renders the page
↓
The new text appears on screen
```

---

# 13. Stop the Development Server

In the terminal where the app is running, press:

```text
Control + C
```

On both Mac and Windows, this stops the development server.

To start it again later:

```bash
npm run dev
```

---

# 14. Practice Challenges

Try these after the main app works.

## Challenge 1: Add a Character Count

Below the output, show how many characters the user typed.

Hint:

```jsx
{userText.length}
```

## Challenge 2: Add a Heading Input

Create another input where the user can change the page heading.

## Challenge 3: Make the Output Uppercase

Display the typed text in uppercase.

Hint:

```jsx
userText.toUpperCase()
```

## Challenge 4: Add a Clear Button

Add a button that clears the input.

Hint:

```jsx
<button onClick={() => setUserText("")}>Clear</button>
```

---

# 15. Final Code for `App.jsx`

```jsx
import { useState } from "react";
import "./App.css";

function App() {
  const [userText, setUserText] = useState("");

  return (
    <main className="page">
      <section className="card">
        <h1>My First React Website</h1>

        <p>
          Type something in the input box below. React will update the page as
          you type.
        </p>

        <label htmlFor="textInput">Enter some text:</label>

        <input
          id="textInput"
          type="text"
          value={userText}
          onChange={(event) => setUserText(event.target.value)}
          placeholder="Type here..."
        />

        <h2>You typed:</h2>
        <p className="output">{userText}</p>
      </section>
    </main>
  );
}

export default App;
```

---

# 16. Key Takeaways

By completing this activity, you learned that:

* React apps are made of components.
* Components are JavaScript functions.
* JSX lets you write HTML-like code inside JavaScript.
* `useState` lets a component remember and update information.
* When state changes, React updates the page automatically.
* Inputs can be connected to state so the page responds to user actions.

Congratulations — you built your first interactive React component.

```
::contentReference[oaicite:3]{index=3}
```

[1]: https://nodejs.org/en/download?utm_source=chatgpt.com "Download Node.js®"
[2]: https://vite.dev/guide/?utm_source=chatgpt.com "Getting Started | Vite"
