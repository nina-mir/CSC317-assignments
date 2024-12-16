const express = require('express');
const todosRoutes = require('./routes/todos');
const elseRoutes = require('./routes/else');
const staticRoutes = require('./routes/static');

const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON request bodies
app.use('/todos', todosRoutes); // Use the todos routes
app.use('/else', elseRoutes) // Use /else routes
// Use static routes for serving files
app.use('/static', staticRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
