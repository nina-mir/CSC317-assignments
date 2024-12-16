<pre>peoject-folder/
├── db/
│   ├── database.js         # Database connection and setup
│   ├── migrations/         # Optional: Scripts for database schema changes
│   └── seed.js             # Optional: Script to prepopulate the database
├── routes/
│   └── todos.js            # Routes for /todos endpoints
├── models/
│   └── todo.js             # Database operations for the todos table
├── public/                 # Static files ( html, css, etc if needed)
├── app.js                  # Express app setup
├── package.json            # Node.js dependencies and scripts
├── package-lock.json       # Dependency lockfile
├── .gitignore              # git ignore file
└── README.md               # Project documentation
</pre>

## Why This Structure?
- Modularity: Separates concerns (e.g., routes, database logic), making the code easier to read, test, and maintain.
- Scalability: The structure can easily accommodate new features (e.g., additional routes, tables) without becoming cluttered.
- Reusability: Database functions in models/todo.js can be reused across different parts of the app.
- Best Practices: Aligns with common Express project conventions, making it easier for other developers to understand and contribute.

## Let's extend this 

In this excercise, you are adding a /else route to the existing codebase.

**Step 1:** Add `else.js` in the `/routes` Directory

`// Example endpoint: GET /else`

`// Another example endpoint: GET /else/greet/:name`

Don't forget to: `module.exports = router;`

**Step 2:** Register `else.js` in `app.js`

<pre>
project-folder/
├── db/
│   └── database.js         
├── routes/
│   ├── todos.js            # Existing todos routes
│   └── else.js             # New else routes
├── models/
│   └── todo.js             
├── public/                 
├── app.js                  
├── package.json            
├── package-lock.json       
└── README.md               
</pre>

### Edge Cases and Concepts
1. Parameters and Query Strings
In `/else/greet/:name`, the `:name` parameter is dynamic. Ensure you handle cases where the parameter is missing, empty, or contains unexpected characters.
For example, `/else/greet/123` will greet 123, while `/else/greet/` without a name should return an `error`.
2. Modularization
By creating a separate `else.js`, you maintain modularity. Routes specific to the `/else` endpoint are isolated, keeping your codebase clean and organized.
3. Error Handling
Always handle invalid requests gracefully (e.g., missing parameters, invalid inputs).
Use `res.status(400)` for bad input or `res.status(404)` if the requested resource doesn’t exist.
4. Middleware (Optional)
If the else endpoints require middleware (e.g., logging or authentication), apply it locally to those routes using `router.use()` or globally in `app.js`.


## Extend more --> Steps to Add Static Route

**Step 1:** Create a `public/` Directory
