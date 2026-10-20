# View Engines in Express.js using Pug 

## How to Set Up and Use Pug in Express

### 1. Install the View Engine

```bash
npm install pug
```

### 2. Set the View Engine in Express

```javascript
const express = require('express');
const app = express();

// Tell Express to use Pug
app.set('view engine', 'pug');

// Optional: Set the directory for view templates
app.set('views', './views');
```

### 3. Create a View Template

Inside your project folder:

```
/views
    |-- index.pug
```

**index.pug**

```pug
doctype html
html
  head
    title= title
  body
    h1 Welcome, #{username}!
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

## Special Pug Syntax

- **Variables**: `#{variable}`
- **Tags and Nesting**: Indentation defines structure.
- **Conditionals**:

```pug
if user
  h2 Welcome back, #{user.name}
else
  h2 Welcome, Guest
```

- **Loops**:

```pug
ul
  each item in items
    li= item
```

---

# Hands-On Project: Dynamic Factsheet Generator for ML Algorithms

## Project Idea
Create a small Express app that:
- Has multiple dynamic pages for different Machine Learning algorithms.
- Each page shows: Name, Application, History.
- Uses a view engine (Pug) to render data dynamically.

---

# Step-by-Step Action Plan

## 1. Project Setup

```bash
mkdir ml-factsheets
cd ml-factsheets
npm init -y
npm install express pug
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

app.set('view engine', 'pug');
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

**views/index.pug**

```pug
doctype html
html
  head
    title ML Factsheets
  body
    h1 Machine Learning Algorithms
    ul
      each val, key in algorithms
        li
          a(href=`/algorithm/${key}`) #{val.name}
```

**views/factsheet.pug**

```pug
doctype html
html
  head
    title= algorithm.name
  body
    h1= algorithm.name
    p
      strong Application:
      |  #{algorithm.application}
    p
      strong History:
      |  #{algorithm.history}
    a(href='/') Back to Home
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
- Demonstrate modular templating using Pug.


