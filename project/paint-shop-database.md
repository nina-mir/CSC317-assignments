````markdown
# Report: Paint Shop E-Commerce Database for Node/Express/SQLite

This report describes a **minimal but full-stack-ready** e-commerce database design for a **paint shop** built with **Node.js, Express, and SQLite**.

It focuses on:

1. How to **organize the DB module** in the Node project  
2. A **minimal database structure** suitable for a full-stack app  
3. What **methods** the DB module should expose  
4. Concrete **implementation** of those methods  
5. Clear **filenames** and **how to run** the code  

---

## 1. Project & DB Module Organization

### 1.1 Suggested Project Structure

```text
paint-shop-app/
  package.json
  server.js

  db/
    schema.sql
    init.js
    index.js        <-- main DB module

  routes/
    products.js
    customers.js
    cart.js

  data/
    paint-shop.db   <-- SQLite file (created by init.js)
````

* All database-related code is inside the `db/` folder.
* `index.js` is the **DB module** that other parts of the app use.
* The **Express routes** in `routes/` import and call functions from `db/index.js`.

---

### 1.2 Storing the DB Module (Pattern)

We use a **single DB module** (`db/index.js`) that:

* Creates **one SQLite connection** and keeps it open
* Exports **high-level helper methods**, not raw SQL everywhere
* Optionally also exports the raw `db` object for advanced use

Example usage in a route:

```js
// routes/products.js
const express = require('express');
const db = require('../db'); // this is db/index.js
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await db.getActiveProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
```

This keeps routes clean and readable.

---

## 2. Minimal Database Structure (SQLite Schema)

We want a structure that is:

* **Minimal** (only the essentials)
* **Realistic** for a full-stack app
* **Extensible** (easy to add orders later)

### 2.1 Tables

We use three tables:

1. `products` – paints we sell
2. `customers` – people using the site and logging in
3. `cart_items` – what is currently in each customer’s cart

---

### 2.2 Schema (`db/schema.sql`)

```sql
-- db/schema.sql

-- Products table: all paints
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL,      -- store price as integer cents
  color_family TEXT,                 -- e.g. 'red', 'blue', 'neutral'
  in_stock INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1
);

-- Customers table: basic account data + password hash
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  shipping_address TEXT,
  password_hash TEXT NOT NULL,       -- hashed password (e.g. bcrypt)
  created_at TEXT DEFAULT (datetime('now'))
);

-- Cart items: items in each customer’s cart
CREATE TABLE IF NOT EXISTS cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

This schema supports:

* Listing and filtering products
* Basic authentication using `email` + `password_hash`
* Cart functionality per customer

Orders, order history, etc. can be added later without breaking this design.

---

## 3. DB Module Responsibilities (`db/index.js`)

The DB module should provide **high-level methods** that match what the app needs.

### 3.1 Connection Responsibilities

* Open a connection to `./data/paint-shop.db`
* Enable foreign keys: `PRAGMA foreign_keys = ON;`

### 3.2 Methods (API Surface)

A minimal but useful set:

#### Product methods

* `getActiveProducts()`

  * Returns all products where `is_active = 1`.
* `getProductById(id)`

  * Returns one product row.

#### Customer methods

* `createCustomer({ email, full_name, shipping_address, password_hash })`

  * Inserts a new customer.
* `findCustomerByEmail(email)`

  * Used for login and signup checks.

#### Cart methods

* `getCartByCustomerId(customerId)`

  * Returns cart items joined with product info.
* `addOrUpdateCartItem(customerId, productId, quantity)`

  * Adds item to cart or updates quantity if it already exists.
* `removeCartItem(customerId, productId)`

  * Removes a single product from the cart.
* `clearCart(customerId)`

  * Empties the cart.

These methods give the Express routes everything they need for a basic front-end:

* Product listing page
* Signup/login
* Add to cart / view cart / clear cart

---

## 4. DB Module Implementation (`db/index.js`)

Here is a concise implementation using **Promises** on top of `sqlite3`.

```js
// db/index.js
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, '..', 'data', 'paint-shop.db');

// Open DB connection
const db = new sqlite3.Database(DB_PATH);

// Enable foreign keys
db.exec('PRAGMA foreign_keys = ON;');

// --- Helper wrappers (promise-based) ---
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this); // this.lastID, this.changes
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

// --- Product methods ---

async function getActiveProducts() {
  return all(
    'SELECT * FROM products WHERE is_active = 1 ORDER BY name ASC'
  );
}

async function getProductById(id) {
  return get('SELECT * FROM products WHERE id = ?', [id]);
}

// --- Customer methods ---

async function createCustomer({ email, full_name, shipping_address, password_hash }) {
  const result = await run(
    `INSERT INTO customers (email, full_name, shipping_address, password_hash)
     VALUES (?, ?, ?, ?)`,
    [email, full_name, shipping_address, password_hash]
  );

  return result.lastID; // new customer id
}

async function findCustomerByEmail(email) {
  return get('SELECT * FROM customers WHERE email = ?', [email]);
}

// --- Cart methods ---

async function getCartByCustomerId(customerId) {
  return all(
    `SELECT
       cart_items.id,
       cart_items.quantity,
       products.id AS product_id,
       products.name,
       products.price_cents,
       products.color_family
     FROM cart_items
     JOIN products ON products.id = cart_items.product_id
     WHERE cart_items.customer_id = ?`,
    [customerId]
  );
}

async function addOrUpdateCartItem(customerId, productId, quantity) {
  // Check if item already in cart
  const existing = await get(
    `SELECT id, quantity
     FROM cart_items
     WHERE customer_id = ? AND product_id = ?`,
    [customerId, productId]
  );

  if (existing) {
    const newQty = existing.quantity + quantity;
    await run(
      `UPDATE cart_items
       SET quantity = ?
       WHERE id = ?`,
      [newQty, existing.id]
    );
  } else {
    await run(
      `INSERT INTO cart_items (customer_id, product_id, quantity)
       VALUES (?, ?, ?)`,
      [customerId, productId, quantity]
    );
  }
}

async function removeCartItem(customerId, productId) {
  await run(
    `DELETE FROM cart_items
     WHERE customer_id = ? AND product_id = ?`,
    [customerId, productId]
  );
}

async function clearCart(customerId) {
  await run(
    `DELETE FROM cart_items
     WHERE customer_id = ?`,
    [customerId]
  );
}

// Export API
module.exports = {
  db, // raw connection (optional)
  getActiveProducts,
  getProductById,
  createCustomer,
  findCustomerByEmail,
  getCartByCustomerId,
  addOrUpdateCartItem,
  removeCartItem,
  clearCart,
};
```

---

## 5. DB Initialization Script (`db/init.js`)

This script creates the `data/` folder, reads `schema.sql`, and initializes the DB.

```js
// db/init.js
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DB_DIR, 'paint-shop.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

fs.mkdirSync(DB_DIR, { recursive: true });

const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
const db = new sqlite3.Database(DB_PATH);

db.exec(schema, (err) => {
  if (err) {
    console.error('Error running schema:', err);
  } else {
    console.log('Database initialized ✅');
  }
  db.close();
});
```

---

## 6. Minimal Express Server (`server.js`)

Just enough to show how routes plug into the DB module.

```js
// server.js
const express = require('express');
const productsRouter = require('./routes/products');
const customersRouter = require('./routes/customers');
const cartRouter = require('./routes/cart');

const app = express();
app.use(express.json());

// Mount routers
app.use('/products', productsRouter);
app.use('/customers', customersRouter);
app.use('/cart', cartRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Paint shop server listening on http://localhost:${PORT}`);
});
```

---

## 7. Example Route Files

### 7.1 `routes/products.js`

```js
// routes/products.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// GET /products
router.get('/', async (req, res) => {
  try {
    const products = await db.getActiveProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
```

### 7.2 `routes/cart.js` (minimal)

```js
// routes/cart.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// GET /cart/:customerId
router.get('/:customerId', async (req, res) => {
  try {
    const cart = await db.getCartByCustomerId(req.params.customerId);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /cart/add
router.post('/add', async (req, res) => {
  const { customerId, productId, quantity } = req.body;
  try {
    await db.addOrUpdateCartItem(customerId, productId, quantity ?? 1);
    res.status(201).json({ message: 'Item added to cart' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
```

(You can build `customers.js` similarly around `createCustomer` and `findCustomerByEmail`.)

---

## 8. How to Run the Code

From the project root (`paint-shop-app/`):

1. **Initialize the project (once)**

   ```bash
   npm init -y
   npm install express sqlite3
   ```

2. **Initialize the database**

   ```bash
   node db/init.js
   ```

   This will create `data/paint-shop.db` using `db/schema.sql`.

3. **Start the Express server**

   ```bash
   node server.js
   ```

4. **Test endpoints**

   * Products: `GET http://localhost:3000/products`
   * Cart for customer 1: `GET http://localhost:3000/cart/1`
   * Add to cart:

     ```bash
     curl -X POST http://localhost:3000/cart/add \
       -H "Content-Type: application/json" \
       -d '{"customerId":1,"productId":1,"quantity":2}'
     ```

