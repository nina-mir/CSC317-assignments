const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (including index.html) from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// POST route to handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`Received login via Fetch -> Username: ${username}, Password: ${password}`);

  // Respond to the client
  res.send('Login data received via Fetch API!');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
