# E-Commerce Website Project

## Project Overview
Build a simple but complete E-Commerce website using **Node.js**, **Express**, and **SQLite**. Your website should allow users to browse, search, and purchase products. Think of this as a mini-version of Amazon, Etsy, or Ebay.

This project is designed to be beginner-friendly but still allow creativity and personal flair.

## Minimum Requirements

### Technical Stack
- Backend: Node.js with Express.js
- Database: SQLite (stored locally)
- Frontend: HTML, CSS, and JavaScript (no need to use a templating engine like Pug or EJS)
- Authentication: Login and registration with password hashing (e.g., bcrypt)
- GitHub Repository with active collaboration from all team members
- Deployed at least to [Glitch](https://glitch.com/)

### Core Features (Required)
- [x] **Storefront Page**: A home page displaying a list of available products (minimum 12 products)
- [x] **Login/Registration Page**: Users must be able to create an account and log in
- [x] **Product Detail Page**: Clicking on a product shows details, including title, image, description, and price
- [x] **Search Functionality**: Users can search for products by name or keyword
- [x] **User Profile Page**: Displays user information and purchase history
- [x] **Navigation Bar**: Appears on all pages with links to Home, Login/Profile, Cart, etc.
- [x] **About Page**: Brief information about your fake company
- [x] **FAQ Page**: Answers to common questions (e.g., refund policy, shipping info)
- [x] **Shopping Cart + Payment Page**: Users can add items to cart and "purchase" (mocked checkout)

## Sketches / Wireframes (Text-Based)

### Storefront Page
```
[Logo]  [Search bar]  [Login/Register] [Cart Icon]

----------------------------------------
| Product 1 | Product 2 | Product 3     |
|----------|-----------|--------------|
| Image    | Image     | Image        |
| Name     | Name      | Name         |
| Price    | Price     | Price        |
----------------------------------------
```

### Login/Register Page
```
Login:
[ Email        ]
[ Password     ]
[ Login Button ]

Register:
[ Name         ]
[ Email        ]
[ Password     ]
[ Register Btn ]
```

### Product Page
```
[Product Image]
Title: Cool Mug
Price: $12.99
Description: A really cool coffee mug!
[Add to Cart Button]
```

### Cart/Checkout Page
```
Items in Cart:
- Cool Mug x 2   $25.98
- Notebook x 1   $5.00

[ Checkout Button (mock) ]
```

### Profile Page
```
Welcome, Ava!
Email: ava@example.com

Purchase History:
- Cool Mug x 2 on 04/21/2025
- Notebook x 1 on 04/21/2025
```

## Additional Notes
- The payment system does not need to connect to a real payment gateway.
- SQLite DB can be pre-seeded with product data for simplicity.
- You can use Bootstrap or Tailwind CSS for styling if desired.

## Project Directory Structure
```
my-ecommerce-site/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── routes/
│   ├── auth.js
│   ├── products.js
│   ├── users.js
│   └── cart.js
├── views/  <-- optional if using template engine
├── data/
│   └── database.sqlite
├── app.js
├── package.json
└── README.md
```

## Submission Guidelines
- Create a GitHub repo and add all team members as collaborators
- All members must make meaningful commits
- Deployed version must be live on Glitch or similar
- Include a README with:
  - Project description
  - How to install/run locally
  - Team members and contributions

---

Happy coding! Remember: Build for accessibility and inclusivity. 🧡

