const express = require('express');
const path = require('path')
const router = express.Router();
const { getTodos, addTodo, updateTodo, deleteTodo } = require('../models/todo');


// Serve the to-do form at /todos/form
router.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/todos-form.html'));
});


// GET /todos - Get all todos
router.get('/', (req, res) => {
  getTodos((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /todos - Add a new todo
router.post('/', (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: 'Task is required.' });
  addTodo(task, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Todo added.' });
  });
});

// PUT /todos/:id - Update a todo
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  updateTodo(id, completed, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Todo updated.' });
  });
});

// DELETE /todos/:id - Delete a todo
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  deleteTodo(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Todo deleted.' });
  });
});

module.exports = router;
