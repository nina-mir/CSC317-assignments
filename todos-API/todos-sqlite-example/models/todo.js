const db = require('../db/database');

// Get all todos
const getTodos = (callback) => {
  db.all('SELECT * FROM todos', [], callback);
};

// Add a new todo
const addTodo = (task, callback) => {
  db.run('INSERT INTO todos (task, completed) VALUES (?, ?)', [task, 0], callback);
};

// Update a todo
const updateTodo = (id, completed, callback) => {
  db.run('UPDATE todos SET completed = ? WHERE id = ?', [completed, id], callback);
};

// Delete a todo
const deleteTodo = (id, callback) => {
  db.run('DELETE FROM todos WHERE id = ?', [id], callback);
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
