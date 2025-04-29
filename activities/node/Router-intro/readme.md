# Understanding express.Router Middleware in Express.js

Express.js is a powerful and flexible web application framework for Node.js. One of its core features is the `express.Router()` middleware, which helps organize routes in modular, mountable route handlers.

## What is `express.Router()`?

`express.Router()` is a mini Express application. It doesn’t bring in views or settings like `app`, but it behaves like a middleware and can handle routes.

This is helpful when your application grows and you want to split your routing logic across multiple files or route modules.

## Why Use `express.Router()`?

- Modularize code
- Keep route definitions clean
- Enable reuse of middleware on specific groups of routes
- Improve readability and maintainability

---

## Basic Syntax

```js
const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.send('Home page');
});

router.get('/about', (req, res) => {
  res.send('About page');
});

module.exports = router;
```

### Using the Router in an App

```js
const express = require('express');
const app = express();
const homeRoutes = require('./routes/home');

app.use('/', homeRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

---

## Using Middleware with Routers

You can attach middleware specific to a router:

```js
router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});
```

---

## Step-by-Step Activity: Building a Modular Express Router Project

We will build a simple Express.js project with three major route groups:
- Users (`/users`)
- Products (`/products`)
- Reviews for each product (`/products/:productId/reviews`)

We will use dummy data for simplicity.

### Step 1: Setup Your Project

```bash
mkdir router-demo
cd router-demo
npm init -y
npm install express
```

Create a basic folder structure:
```bash
mkdir routes
```

Create `index.js`:

```js
const express = require('express');
const app = express();

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

### Step 2: Create the User Routes

File: `routes/users.js`

```js
const express = require('express');
const router = express.Router();

const users = ['Morgan', 'Mina', 'Malala'];

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:username', (req, res) => {
  const user = users.find(u => u.toLowerCase() === req.params.username.toLowerCase());
  if (user) {
    res.json({ username: user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;
```

---

### Step 3: Create the Product and Review Routes

File: `routes/products.js`

```js
const express = require('express');
const router = express.Router();

const products = [
  { id: 1, name: 'Book' },
  { id: 2, name: 'Laptop' },
  { id: 3, name: 'Pen' },
  { id: 4, name: 'Backpack' },
  { id: 5, name: 'Glasses' },
  { id: 6, name: 'Shoes' }
];

const reviews = {
  1: ['Great read!', 'Nice pages', 'Would buy again'],
  2: ['Fast', 'Lightweight', 'Battery lasts long'],
  3: ['Smooth ink', 'Comfortable grip', 'Cheap'],
  4: ['Stylish', 'Fits a lot', 'Good straps'],
  5: ['Clear', 'Trendy', 'Durable'],
  6: ['Comfortable', 'Good grip', 'Nice design']
};

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:productId', (req, res) => {
  const product = products.find(p => p.id == req.params.productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

router.get('/:productId/reviews', (req, res) => {
  const productId = req.params.productId;
  const productReviews = reviews[productId];
  if (productReviews) {
    res.json(productReviews);
  } else {
    res.status(404).json({ error: 'Reviews not found for product' });
  }
});

module.exports = router;
```

---

### Step 4: Test the Routes

Start the server:
```bash
node index.js
```

Visit:
- `http://localhost:3000/users`
- `http://localhost:3000/users/Mina`
- `http://localhost:3000/products`
- `http://localhost:3000/products/2`
- `http://localhost:3000/products/2/reviews`

---

## Conclusion

Using `express.Router()` helps keep your code clean, modular, and maintainable. It's especially useful for organizing large applications with many route handlers. This activity gives you a solid hands-on introduction to building with routers in Express.

---

Happy coding! 🌈✨

---

**Optional Challenge:** Add `POST` routes to create new users, products, and reviews using `express.json()` middleware. Use `postman` or `curl` to test them.

