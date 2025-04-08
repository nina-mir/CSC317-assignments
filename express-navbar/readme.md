# CSC 317 Homework: Creating a Three-Route Express Application with Flexbox Navigation

## Overview

For this assignment, you will create a Node/Express application that hosts three separate routes. Each route corresponds to a unique assignment you have done before (or about to finish!😺):
1. **Climate Crisis**
2. **Typesetting**
3. **Four Algorithms**

You will build a **navbar** using **flexbox** that will display these three options. When the user clicks on one of the navbar links, they’ll be sent to the route for that assignment, which then links to the *actual repository* for that assignment. You must:

- Create a **Node/Express server** that listens on a port (e.g., 3000).
- Define **three routes** (one for each assignment topic).
- In the **frontend**, have a navbar using **flexbox** with links for Climate Crisis, Typesetting, and Four Algorithms.
- Deploy this Node/Express app to **Glitch**.
- Submit one PDF to Canvas containing **two links**:  
  1. A link to your project repo on **GitHub**.  
  2. A link to your deployed application on **Glitch**.  

### Fun Factor!

Feel free to spice it up with your own creative style. This assignment helps you:
- Practice building multiple routes in Node/Express.
- Explore **flexbox** for layout.
- Deploy a small web project to Glitch.

## Getting Started

### 1. Initialize Your Node/Express Project

1. **Create a new folder** for your project.
2. In your terminal or command prompt, navigate inside this folder.
3. Run:
   ```bash
   npm init -y
   ```
   This will create a `package.json` file with default settings.
4. Install Express:
   ```bash
   npm install express
   ```

### 2. Project Architecture (Simple)

A possible structure:

```
.
├── public
│   └── index.html  <- Put your nav bar here (using flexbox)
├── server.js       <- Main server code
├── package.json
└── README.md       <- Brief documentation
```

- **public/index.html**: Your main HTML file containing a navbar with three links: Climate Crisis, Typesetting, Four Algorithms. Use **flexbox** to style the navbar horizontally.
- **server.js**: Contains your Express server code with three routes.

### 3. Starter Code for `server.js`

Here’s a basic template to get you started:

```js
// server.js

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// add any necessary code you'd want to!

//root
app.get('/', (req, res) => {
    // your nav bar is on index.html
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


// Route for Climate Crisis
app.get("/climate-crisis", (req, res) => {
  //TODO add code!
});

// Route for Typesetting
app.get("/typesetting", (req, res) => {
  //TODO add code
});

// Route for Four Algorithms
app.get("/four-algorithms", (req, res) => {
  //TODO add code
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### 4. Creating the Navbar with Flexbox

In your `public/index.html`, you could do something like:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My Homework Assignments</title>
  <style>
    nav {
      display: flex;
      justify-content: space-around;
      background-color: #eee;
      padding: 1rem;
    }
    nav a {
      text-decoration: none;
      font-weight: bold;
      margin: 0 1rem;
    }
  </style>
</head>
<body>
  <nav>
    <a href="/climate-crisis">Climate Crisis</a>
    <a href="/typesetting">Typesetting</a>
    <a href="/four-algorithms">Four Algorithms</a>
  </nav>

  <h1>Welcome!</h1>
  <p>Click on one of the links above to visit the corresponding route.</p>
</body>
</html>
```

- **Note**: The `<a href="/climate-crisis">Climate Crisis</a>` points to our **Express route**.

### 5. Deploying to Glitch

> this could be helpful too! --> [📺How to host a Node js app on Glitch com](https://www.youtube.com/watch?v=HBT7_LrFg1o)


1. Go to [Glitch](https://glitch.com/).
2. Create a new project.
3. Copy your files over to your Glitch project.
4. In your `package.json`, ensure your `start` script is set to `node server.js` (or however your main file is named).
5. Wait for Glitch to build and click the **Show** button to see your live app URL.

## Submission Instructions

1. **PDF Submission**: Submit **one PDF** to Canvas.
   - **Link #1**: Your GitHub repo for this Node/Express project.
   - **Link #2**: Your deployed Glitch application.

