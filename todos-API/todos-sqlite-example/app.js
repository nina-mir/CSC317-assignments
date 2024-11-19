const express = require('express');
const todosRoutes = require('./routes/todos');

const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON request bodies
app.use('/todos', todosRoutes); // Use the todos routes

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
