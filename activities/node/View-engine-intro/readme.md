# View Engines in Express.js

## What is a View Engine?

A **View Engine** allows you to generate dynamic HTML pages by writing templates with placeholders instead of hardcoding the entire HTML.

When a request is made to your server, Express can use a view engine to fill in the placeholders with actual data and send the generated HTML page back to the client.

**Key Points:**
- **Templates**: HTML files with special syntax.
- **Dynamic Content**: Populate HTML with server-side data.
- **Rendering**: Express uses the view engine to compile templates into HTML.

## Why Use a View Engine?

- **Separation of Concerns**: Keep your logic (JavaScript) separate from your presentation (HTML).
- **Reusability**: Create reusable components like headers, footers, navbars.
- **Efficiency**: Faster development for dynamic content.
- **Maintainability**: Easy updates and bug fixes.

---

## Popular View Engines for Express

- **EJS** (Embedded JavaScript)
- **Pug** (popular! formerly called Jade)
- **Handlebars**

We'll focus on **EJS** because it's very beginner-friendly!

---

## How to Set Up and Use a View Engine in Express

### 1. Install the View Engine

```bash
npm install ejs
```

### 2. Set the View Engine in Express

```javascript
const express = require('express');
const app = express();

// Tell Express to use EJS
app.set('view engine', 'ejs');

// Optional: Set the directory for view templates
app.set('views', './views');
```

### 3. Create a View Template

Inside your project folder:

```
/views
    |-- index.ejs
```

**index.ejs**

```html
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1>Welcome, <%= username %>!</h1>
</body>
</html>
```

### 4. Render a View in a Route

```javascript
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        username: 'Ada Lovelace'
    });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
```

---

## Special EJS Syntax

- **Output Data**: `<%= data %>`
- **Run JS Code**: `<% code %>`
- **Include Other Templates**: `<%- include('partials/header') %>`

Example of looping:

```html
<ul>
  <% for(let i = 0; i < items.length; i++) { %>
    <li><%= items[i] %></li>
  <% } %>
</ul>
```

---

# Hands-On Project: Dynamic Factsheet Generator for ML Algorithms

## Project Idea
Create a small Express app that:
- Has multiple dynamic pages for different Machine Learning algorithms.
- Each page shows: Name, Application, History.
- Uses a view engine (EJS) to render data dynamically.

---

# Step-by-Step Action Plan

## 1. Project Setup

```bash
mkdir ml-factsheets
cd ml-factsheets
npm init -y
npm install express ejs
```

Create folders:

```bash
mkdir views public
```

## 2. Basic Server Setup

**server.js**

```javascript
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

const algorithms = {
    decisionTree: {
        name: "Decision Tree",
        application: "Classification tasks in medical diagnosis",
        history: "Introduced in the 1960s in pattern recognition research."
    },
    kMeans: {
        name: "K-Means Clustering",
        application: "Customer segmentation in marketing",
        history: "First introduced by Stuart Lloyd in 1957."
    },
    neuralNetwork: {
        name: "Neural Networks",
        application: "Image and speech recognition",
        history: "Popularized in the 1980s with backpropagation."
    }
};

app.get('/', (req, res) => {
    res.render('index', { algorithms });
});

app.get('/algorithm/:key', (req, res) => {
    const algorithm = algorithms[req.params.key];
    if (algorithm) {
        res.render('factsheet', { algorithm });
    } else {
        res.status(404).send('Algorithm not found');
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

## 3. Create Views

**views/index.ejs**

```html
<!DOCTYPE html>
<html>
<head>
    <title>ML Factsheets</title>
</head>
<body>
    <h1>Machine Learning Algorithms</h1>
    <ul>
        <% Object.keys(algorithms).forEach(key => { %>
            <li><a href="/algorithm/<%= key %>"><%= algorithms[key].name %></a></li>
        <% }); %>
    </ul>
</body>
</html>
```

**views/factsheet.ejs**

```html
<!DOCTYPE html>
<html>
<head>
    <title><%= algorithm.name %></title>
</head>
<body>
    <h1><%= algorithm.name %></h1>
    <p><strong>Application:</strong> <%= algorithm.application %></p>
    <p><strong>History:</strong> <%= algorithm.history %></p>
    <a href="/">Back to Home</a>
</body>
</html>
```

## 4. Test Your App

- Visit [http://localhost:3000](http://localhost:3000)
- Click on any algorithm to see its dynamically generated factsheet!

---

# 🌟 Extension Ideas
- Add images for each algorithm.
- Style with CSS (in `/public` folder).
- Add a "Not Found" page for invalid algorithm keys.

---

# Final Thoughts
This project will:
- Teach you how to use a view engine.
- Show how to pass data dynamically.
- Demonstrate modular templating.


