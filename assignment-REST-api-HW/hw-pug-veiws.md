# CSC 317 — Group Project: Pug Templates & Views

## Overview

In this assignment, your group will **extend your existing REST API project** by adding a **view layer** using the [Pug template engine](https://pugjs.org/). Your API endpoints from the previous assignment will continue to work as-is. You are now adding **HTML pages** that users can visit in a browser.

This is a natural next step: in the real world, most web applications have both an **API layer** (returning JSON for programmatic access) and a **view layer** (returning HTML for humans in a browser). You will build both, side by side.

> **This assignment builds directly on your [REST API HW](https://github.com/nina-mir/CSC317-assignments/blob/main/assignment-REST-api-HW/readme.md).** Make sure that assignment is complete before starting this one.

---

## What This Phase Is (and Is NOT)

It is important to understand the scope of this assignment clearly.

### This phase IS:

- Adding **Pug templates** that render HTML pages in the browser.
- Creating a **base layout** with a shared navbar and footer.
- Building **static/mockup pages** for login, user profile, and shopping cart.
- Keeping your existing JSON API endpoints working alongside the new views.

### This phase is NOT:

- **No database.** Data is still in-memory. A database will be added in a future phase.
- **No real authentication.** The login page is a form that submits to a POST route, but you are **not** implementing sessions, passwords, cookies, or any real login logic. The POST route can simply redirect or render a "success" page.
- **No real shopping cart logic.** The cart page is a **static template** showing a mockup of what a cart would look like. You do not need to track which user added what.
- **No deployment.** Everything runs locally.

Think of this phase as **building the storefront windows** — the pages look real and are wired up with routes, but the backend logic behind login, sessions, and cart management will come later.

---

## Why Keep Both JSON API and HTML Views?

Your previous assignment created routes like `GET /` and `GET /:identifier` that return **JSON**. In this assignment, you will add new routes that return **HTML via Pug**. You will keep both.

This is standard practice in web development and is worth understanding:

| Layer | Example Route | Returns | Used By |
|-------|--------------|---------|---------|
| **API** | `GET /api/products` | JSON | Mobile apps, frontend JavaScript, other services, Postman/curl |
| **View** | `GET /products` | HTML (Pug) | A human visiting the site in a browser |

Separating these concerns means your data layer is reusable. A mobile app and a web browser can both talk to the same API. The HTML views are just one consumer of that API. In a professional codebase, you will almost always see `/api/...` routes separated from page-rendering routes.

**What this means for your code:** Move your existing JSON endpoints under an `/api` prefix (e.g., `GET /` becomes `GET /api/products`, `POST /add` becomes `POST /api/products/add`, etc.) and create new view routes at the top level (e.g., `GET /products`, `GET /products/:name`).

---

## Setup

### Install Pug

```bash
npm i pug
```

### Configure Express to Use Pug

Add the following to your `server.js`, **before** your routes:

```javascript
const path = require('path');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
```

### Serve Static Files (CSS, images)

Create a `public/` folder for your stylesheets and any static assets:

```javascript
app.use(express.static(path.join(__dirname, 'public')));
```

---

## Required Templates

You must create the following Pug templates inside a `views/` directory.

### 1. Base Layout — `views/layout.pug`

This is the **parent template** that all other templates extend. It must include:

- An HTML boilerplate (`html`, `head`, `body`).
- A `<title>` block that child templates can override.
- A **navbar** with links to: Home (`/`), Products (`/products`), Cart (`/cart`), Login (`/login`).
- A **content block** (`block content`) where child pages inject their content.
- A **footer** with your group name and the current year.
- A `<link>` to your CSS stylesheet in `public/`.

Every other template must use `extends layout` and `block content` to inherit the navbar and footer.

### 2. Home Page — `views/home.pug`

- Extends `layout.pug`.
- Displays a welcome message and a brief description of your store.
- Links to the products page.

### 3. All Products Page — `views/products.pug`

- Extends `layout.pug`.
- Receives the full product array from the server.
- Renders each product in a list or grid (using Pug iteration with `each`).
- Each product should link to its individual product detail page.

### 4. Single Product Page — `views/product-detail.pug`

- Extends `layout.pug`.
- Receives a single product object from the server.
- Displays all of the product's fields (name, price, and any other fields your group defined).

### 5. 404 Page — `views/404.pug`

- Extends `layout.pug`.
- Displays a clear "404 — Not Found" message.
- Shows the identifier the user searched for (passed dynamically from the server).
- Provides a link back to the products page.

### 6. Login Page — `views/login.pug`

- Extends `layout.pug`.
- Contains an HTML form with fields for **username** and **password**.
- The form submits via `POST` to `/login`.
- **You do NOT need real authentication.** The `POST /login` route should simply render a success page or redirect to the home page. No sessions, no cookies, no password checking.

### 7. User Profile Page — `views/profile.pug`

- Extends `layout.pug`.
- Displays a **static mockup** of a user profile (hardcoded name, email, member since date, etc.).
- This is a placeholder for a future phase when real user accounts exist.

### 8. Shopping Cart Page — `views/cart.pug`

- Extends `layout.pug`.
- Displays a **static mockup** of a shopping cart with 2–3 hardcoded example items, quantities, and a total.
- This is a placeholder. You do **not** need to implement add-to-cart functionality, track items, or connect this to your product data.

---

## Required Routes

### View Routes (return HTML)

| Method | Path | Renders | Notes |
|--------|------|---------|-------|
| `GET` | `/` | `home.pug` | Welcome / landing page |
| `GET` | `/products` | `products.pug` | Pass the full product array to the template |
| `GET` | `/products/:identifier` | `product-detail.pug` or `404.pug` | Render detail if found, 404 if not |
| `GET` | `/login` | `login.pug` | Display the login form |
| `POST` | `/login` | Redirect to `/` or render a success message | No real auth — just handle the form submission |
| `GET` | `/profile` | `profile.pug` | Static mockup |
| `GET` | `/cart` | `cart.pug` | Static mockup |

### API Routes (return JSON) — keep from previous assignment

Move your existing JSON routes under `/api`. They must still work exactly as before:

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/products` | Return all products as JSON |
| `HEAD` | `/api/products` | Return count via custom header |
| `GET` | `/api/products/:identifier` | Return one product as JSON |
| `POST` | `/api/products/add` | Add a product (with validation) |
| `DELETE` | `/api/products/:identifier` | Delete a product |

---

## Project Structure

Your branch should look like this when complete:

```
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
├── public/
│   └── css/
│       └── style.css
├── views/
│   ├── layout.pug
│   ├── home.pug
│   ├── products.pug
│   ├── product-detail.pug
│   ├── 404.pug
│   ├── login.pug
│   ├── profile.pug
│   └── cart.pug
```

---

## CSS & Styling

Your pages must have **basic styling**. This does not need to be elaborate, but it should be more than unstyled HTML. At minimum:

- A consistent color scheme.
- The navbar and footer should be visually distinct from the page content.
- Products should be displayed in a readable layout (list, cards, or grid).
- The login form should be centered and reasonably styled.

Use a single `style.css` file in `public/css/`. You may use a CSS framework (e.g., Bootstrap via CDN) if your group prefers, but it is not required.

---

## Git & GitHub Requirements

The same rules from the previous assignment apply. Read them carefully.

### Branch Rules

- All work must live on a branch called **`pug-templates-HW`**.
- **If any files for this assignment are pushed to `main` or `master`, your group receives a 0.**

```bash
# Start from your existing project
git checkout REST-api-HW
git checkout -b pug-templates-HW

# ... do your work ...

git push -u origin pug-templates-HW
```

### Commit & Push Rules

- **CLI only.** Commits via the GitHub web UI will not count.
- **Every group member** must have at least one meaningful commit.
- Write clear commit messages (e.g., `feat: add base layout with navbar and footer`, `feat: add product detail view with 404 handling`).

---

## Grading

| Criteria | Points |
|----------|--------|
| **`layout.pug`** with navbar, footer, content block, and CSS link | 10 |
| All templates use `extends layout` (template inheritance) | 5 |
| **`home.pug`** with welcome message and link to products | 5 |
| **`products.pug`** renders all products dynamically with `each` | 10 |
| **`product-detail.pug`** displays a single product's fields | 10 |
| **`404.pug`** with dynamic identifier and link back to products | 5 |
| **`login.pug`** with form (username + password fields) | 5 |
| **`POST /login`** route handles form submission (redirect or success message) | 5 |
| **`profile.pug`** static mockup | 5 |
| **`cart.pug`** static mockup with example items | 5 |
| View routes (`/`, `/products`, `/products/:id`, `/login`, `/profile`, `/cart`) all work | 10 |
| API routes preserved under `/api/...` prefix and still return JSON | 5 |
| CSS stylesheet with basic styling applied to all pages | 5 |
| `.gitignore`, `node_modules` not pushed | 5 |
| All work on **`pug-templates-HW` branch only** | 5 |
| **Every group member** has at least one meaningful CLI commit | 5 |
| **Total** | **100** |

### Automatic Zero Conditions

- Pushing assignment files to `main` or `master`.
- Pushing `node_modules` to the repository.
- A group member with **zero commits** on the `pug-templates-HW` branch.
- Commits made via the GitHub web UI instead of the CLI.

---

## Phase Summary — What's Now vs. What's Later

| Feature | This Phase | Future Phase |
|---------|-----------|--------------|
| Product listing & detail pages | Pug templates with in-memory data | Database-backed |
| Login page | Form + dummy POST route | Real authentication with sessions |
| User profile | Static mockup | Dynamic, tied to logged-in user |
| Shopping cart | Static mockup | Functional add/remove, per-user |
| Database | Not required | SQLite or PostgreSQL |
| Deployment | Local only | Deployed to a server |

Your job right now is to get the **templates and routes** working. The logic behind them will grow in future assignments. Build a solid foundation now and it will pay off later.

---

## Resources

- [Pug Documentation](https://pugjs.org/api/getting-started.html)
- [Pug Template Inheritance](https://pugjs.org/language/inheritance.html) — `extends` and `block`
- [Pug Iteration](https://pugjs.org/language/iteration.html) — `each` loops
- [Express `res.render()` Documentation](https://expressjs.com/en/api.html#res.render)
- [REST API HW (previous assignment)](https://github.com/nina-mir/CSC317-assignments/blob/main/assignment-REST-api-HW/readme.md)
- [REST Colors Activity](https://github.com/nina-mir/CSC317-assignments/blob/main/activities/REST-colors/readme.md)

---

