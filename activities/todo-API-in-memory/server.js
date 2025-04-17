// server.js
// A simple Express.js backend for a Todo list API

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// TODO ➡️  Middleware to inlcude static content from 'public' folder


// In-memory array to store todo items
let todos = [];
let nextId = 1;

// TODO ➡️ serve index.html from 'public' at the '/' path



// TODO ➡️ GET all todo items at the '/todos' path




// GET a specific todo item by ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(item => item.id === id);
  if (todo) {
    res.json(todo);
  } else {
    // TODO ➡️ handle 404 status with a message of { message: 'Todo item not found' }
  }
});

// POST a new todo item
app.post('/todos', (req, res) => {
  const { name, priority = 'low', isFun } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const newTodo = {
    id: nextId++,
    name,
    priority,
    isComplete: false,
    isFun
  };
  
  todos.push(newTodo);

  // TODO ➡️ Log every incoming TODO item in a 'todo.log' file @ the root of the project
  // In your HW, you'd INSERT a row in your db table instead of writing to file or push to array!

  res.status(201).json(newTodo);
});

// DELETE a todo item by ID
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(item => item.id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    res.json({ message: `Todo item ${id} deleted.` });
  } else {
    res.status(404).json({ message: 'Todo item not found' });
  }
});

// Start the server
// TODO ➡️ Start the server by listening on the specified PORT