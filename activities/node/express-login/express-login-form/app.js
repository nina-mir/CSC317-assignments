const express = require('express')
const path = require('path')

const PORT = 3000;


// express instance 
const app = express()

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }))

// Serve the static files in "public" folder
app.use(express.static(path.join(__dirname, 'public')));

//Handle POST request 

app.post('/login', (req, res) => {
    const { username, password } = req.body

    console.log(req.body)

    // Log the username/password to the terminal
    console.log(`Received login info -> Username: ${username}, Password: ${password}`);

    // You can send back a success message or redirect the user or check the database ...
    // Here, we just send a simple message but you could serve another html page ...
    res.send('Login data received. Check console for the output.');
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });