# 🌐 Assignment: Building a Dictionary Lookup App with Express.js and the Free Dictionary API

## 🎯 Learning Goals
By completing this assignment, you will:
- Learn how to **set up a Node.js + Express project** from scratch.  
- Understand how to **serve static files** (HTML, CSS, JS) using Express middleware.  
- Learn to make **API requests from the browser** to an external web API.  
- Practice **parsing and displaying JSON data** from an API response.  
- Improve your **frontend design skills** with accessible colors, spacing, and typography.  
- Learn about useful development tools like **nodemon**.  
- Begin to understand what **Routes** are in Express and what they could do in future projects.  

---

## 🧱 Project Overview

You will build a small web application that lets a user enter an **English word** and look up its meaning using the free Dictionary API:

🔗 [https://dictionaryapi.dev/](https://dictionaryapi.dev/)

Your app will:
1. Have an input text box where the user enters an English word.  
2. Have a “Search” or “Submit” button.  
3. Use JavaScript to make a request to the Dictionary API when the user submits a word.  
4. Display below the form:
   - The **phonetics** of the word.  
   - Each **part of speech** and its **corresponding definition(s)**.  
5. Be **responsive**, **accessible**, and **pleasantly styled** using external CSS.  
6. Include a **footer** with:
   - A link to your GitHub repository.  
   - A soft background color distinct from the main page.  

Finally, deploy your finished project on a **free hosting platform** (for example, Render, Vercel, or Glitch).

---

## 🪜 Step-by-Step Guidance

### 1️⃣ Initialize Your Project
1. Create a new folder for your project.  
2. Open it in VS Code (or your preferred editor).  
3. Run the following command in your terminal:
   ```bash
   npm init -y
   ```
4. Install Express:

   ```bash
   npm install express
   ```

5. Install `nodemon` as a development dependency so you don’t have to restart your server manually:

   ```bash
   npm install --save-dev nodemon
   ```
6. Update your `package.json` to include a **start** script for nodemon:

   ```json
   "scripts": {
     "start": "nodemon index.js"
   }
   ```

---

### 2️⃣ Create the Express Server

* In your root folder, create a file called `index.js`.
* Use the CommonJS module format (`require`, not `import`).
* Import Express, create an app, and listen on a port (e.g., 3000).
* Use:

  * `app.use(express.static('public'))` to serve static files like your CSS and JS.
  * `app.get('/', ...)` with `res.sendFile()` to serve your main HTML page.

💡 **Hint:** Place your HTML, CSS, and JS files inside a `/public` directory.

---

### 3️⃣ Create Your Frontend Files

Inside `/public`, create:

* `index.html` – your main page
* `style.css` – external stylesheet
* `app.js` – your client-side JavaScript file

✅ Make sure your HTML links to both files:

```html
<link rel="stylesheet" href="style.css">
<script src="app.js" defer></script>
```

---

## 🧠 JavaScript Logic (Frontend)

Your JavaScript should:

1. Capture the user’s input when they press the button.
2. Make a `fetch()` request to the Free Dictionary API endpoint for that word.
   Example endpoint:

   ```
   https://api.dictionaryapi.dev/api/v2/entries/en/<word>
   ```
3. Wait for the response, parse the JSON, and display:

   * The word’s **phonetic spelling** (if available).
   * Each **part of speech** (e.g., noun, verb, adjective) and its **definition(s)**.

💡 *Tip:* Always handle potential errors (e.g., invalid word or network issue) gracefully — display a user-friendly message.

---

## 🎨 Design Requirements (CSS Guidance)

Your design must be **visually clean**, **responsive**, and **accessible**.

### Page Layout:

* The page background should have a **soft neutral color** (for example, light beige, off-white, or a subtle pastel tone).
* The main content area should be **centered** horizontally with generous padding.

### Typography:

* Import at least **one Google Font** for headings and body text.
* Use **relative font sizes** (`em` or `rem`) for responsiveness.
* Maintain good **contrast** between text and background.

### Input and Button Styling:

* The input box should have rounded corners and a comfortable width.
* The submit button should have:

  * `padding: 0.6rem 1.2rem`
  * `margin-top: 1rem`
  * Background color that stands out (use accessible contrast)
  * Rounded corners
  * Slight hover effect to indicate interactivity.

### Footer:

* The footer should stick to the bottom naturally (no fixed positioning needed).
* Use a **darker or complementary background color**.
* Add **padding of about `1rem`** and center the text.
* Include your **GitHub repo link** here.

---

## 📚 Hints and Notes

### 💭 Using Express Middleware

Express makes it easy to serve static assets like CSS, JS, and images:

```js
app.use(express.static('public'))
```

This tells Express to look for files in the `public` folder when someone requests `/style.css`, `/app.js`, etc.

### 🧭 About Routes (FYI)

Routes are how Express defines **different paths** that respond to HTTP requests (like `/`, `/about`, `/api/word`, etc.).
You’ll learn to create and organize routes soon — but for this project, you only need one route that serves your main HTML page.

### 💡 Possible Future Enhancements

You’re not required to do these, but here are ideas to expand your app later:

* Add a **backend caching layer** to avoid repeated API calls for the same word.
* Use **browser localStorage** to remember the user’s last searched word.
* Add a **loading spinner** or message while waiting for the API response.

---

## 🧾 Deliverables

* Your project folder containing:

  * `index.js` (Express server)
  * `package.json`
  * `/public/index.html`
  * `/public/style.css`
  * `/public/app.js`
* The website should run locally with:

  ```bash
  npm start
  ```
* The app must be **deployed** using one of these free platforms:

  * [Render](https://render.com/)
  * [Vercel](https://vercel.com/)
  * [Glitch](https://glitch.com/)

---

## ✅ Submission

Submit:

1. A link to your **deployed website**.
2. A link to your **GitHub repository** containing all source files.

---

## ✨ Evaluation Criteria

| Category                                              | Points |
| ----------------------------------------------------- | ------ |
| Proper Express setup & file structure                 | 20     |
| Working API request and data parsing                  | 25     |
| Accessible, responsive design                         | 20     |
| Clear and neat UI with appropriate spacing and colors | 15     |
| Footer with GitHub link                               | 10     |
| Code organization and readability                     | 10     |

---
