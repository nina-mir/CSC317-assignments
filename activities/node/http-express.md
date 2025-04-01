# 🌐 HTTP Protocol Basics 🚀

Welcome to the HTTP world! This document will guide you through:

1. What HTTP is and what it's for.
2. Basic history and usage of HTTP.
3. Common HTTP verbs and status codes.
4. Example of making GET requests in JavaScript and Python.
5. A sample breakdown of the HTTP request and response objects.
6. Basic information about CORS errors.
7. Detailed instructions on creating a small Node.js & Express project (called **first-server**) with multiple GET routes, serving static files, redirecting, and logging.

Let's get started! 💻🎉

---

## 1. What is HTTP?

**HTTP** stands for **Hypertext Transfer Protocol**. It’s the foundation of data communication for the World Wide Web. HTTP defines how messages are formatted and transmitted, and what actions web servers and browsers should take in response to various commands. Essentially, every time you visit a web page, your browser (the client) sends an HTTP request, and the server responds with the resource (an HTML page, JSON data, an image, etc.) or an error message.

### A Brief History

- HTTP was first proposed by Tim Berners-Lee in 1989, evolving alongside the web's development.
- Over time, HTTP has gone through several revisions: HTTP/0.9, HTTP/1.0, HTTP/1.1, and more recently HTTP/2 and HTTP/3.
- Each iteration aims to improve performance, security, and reliability.

### Common Usage

- Browsers request resources (HTML, CSS, JS, images).
- RESTful APIs over HTTP allow applications to communicate in a structured way (often using JSON).
- Many IoT devices and mobile apps also use HTTP behind the scenes.

---

## 2. Common HTTP Verbs

HTTP defines different methods (or "verbs") to indicate the desired action:

- **GET**: Retrieve data from a server (e.g., a webpage or JSON data).
- **POST**: Send data to the server to create a new resource.
- **PUT**: Update an existing resource on the server.
- **PATCH**: Partially update an existing resource.
- **DELETE**: Delete a resource from the server.
- **HEAD**: Similar to GET, but only retrieves the headers (no body).
- **OPTIONS**: Describes the communication options available for the target resource.

---

## 3. Common HTTP Status Codes

When a client makes a request, the server sends back an HTTP response with a **status code** that indicates the result of the request. Some frequently encountered status codes are:

- **200 OK**: The request was successful.
- **201 Created**: A new resource was successfully created.
- **301 Moved Permanently**: The requested resource has been permanently moved to a new URL.
- **302 Found**: The requested resource has been temporarily moved to a different URL.
- **400 Bad Request**: The request could not be understood or was missing required information.
- **401 Unauthorized**: Authentication is required and has failed or not yet been provided.
- **403 Forbidden**: The server understood the request but refuses to authorize it.
- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: A generic error message when the server encounters an unexpected condition.

---

## 4. Making a GET Request to a Real API

Below are code snippets showing how to make a **GET** request to a free and real API endpoint related to computer science — we’ll use **GitHub’s public API** to fetch information about the Node.js repository.

### JavaScript (Fetch API)

```js
fetch('https://api.github.com/repos/nodejs/node')
  .then(response => response.json())
  .then(data => {
    console.log('Node.js Repo Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### Python (Requests library)

```python
import requests

response = requests.get("https://api.github.com/repos/nodejs/node")

if response.status_code == 200:
    data = response.json()
    print("Node.js Repo Data:", data)
else:
    print(f"Error {response.status_code}")
```

---

## 5. Sample Breakdown of HTTP Request and Response

An **HTTP request** generally looks like this (textual representation):

```
GET /example/page.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...
Accept: text/html
Accept-Language: en-US,en;q=0.9
Connection: keep-alive
```

1. **Request line**: `GET /example/page.html HTTP/1.1`
2. **Headers**: `Host`, `User-Agent`, `Accept`, etc.
3. **(Optional) Body**: Typically present in POST/PUT requests with data.

An **HTTP response** generally looks like:

```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234

<html>
  <head>
    <title>Example Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

1. **Status line**: `HTTP/1.1 200 OK`
2. **Headers**: `Content-Type`, `Content-Length`, etc.
3. **Body**: The actual resource/content (HTML, JSON, etc.).

---

## 6. Basic Information About CORS Errors

**CORS** stands for **Cross-Origin Resource Sharing**. It’s a mechanism that uses **HTTP headers** to tell browsers whether a web application running at one origin (domain) can access selected resources from a server at a different origin.

- If your front-end JavaScript tries to access a resource from a different domain, you might run into **CORS errors** if the server doesn’t explicitly allow it.
- Common error message: `Access to fetch at '...' from origin '...' has been blocked by CORS policy...`
- To fix this, the server must set headers like `Access-Control-Allow-Origin: *` (or a specific domain) to permit cross-origin access.

---

# 7. Creating a Simple Node/Express Project: **first-server**

Below are step-by-step instructions to start a basic Node.js/Express project that:

- Listens on port 3000
- Has **three** routes: `/one`, `/two`, and `/three`
- Serves content in different ways
- Logs a message whenever someone visits any route
- Uses a folder called `first-server`
- Uses **Morgan** (a popular logger middleware)

Ready? Let's build! 🤖

## Step-by-Step Setup

1. **Create a folder** called `first-server`.

2. **Navigate** into that folder in your terminal:

   ```bash
   cd first-server
   ```

3. **Initialize** a new Node.js project:

   ```bash
   npm init -y
   ```

   This creates a `package.json` file with default values.

4. **Install Express and Morgan**:

```bash
   npm install express morgan
```

5. **Create a file** named `server.js` inside `first-server`. This will be our main server file.

6. **Create a folder** named `public` inside `first-server`. This is where we’ll put static files (like HTML files).

7. **Add an HTML file** in `public` (e.g., `two.html`) that we can serve in route `/two`. For example, `public/two.html`:

```html
   <!DOCTYPE html>
   <html>
   <head>
     <title>Route Two HTML</title>
   </head>
   <body>
     <h1>This is served from /public/two.html!</h1>
   </body>
   </html>
```

8. **Open `server.js`** and add the following code:

   ```js
   // server.js

   const express = require('express');
   const path = require('path');
   const morgan = require('morgan');

   const app = express();

   // Use Morgan logger for all routes
   app.use(morgan('dev'));

   // Route one - inline HTML content
   app.get('/one', (req, res) => {
     res.send('<h1>Hello from route one! 👋</h1>');
   });

   // Route two - serve an HTML file from the public folder
   // We'll define a GET route /two that sends two.html as a response.
   app.get('/two', (req, res) => {
     res.sendFile(path.join(__dirname, 'public', 'two.html'));
   });

   // Route three - redirect to https://www.missionlocal.org
   app.get('/three', (req, res) => {
     res.redirect('https://www.missionlocal.org');
   });

   // Listen on port 3000
   app.listen(3000, () => {
     console.log('Server listening on port 3000! 🚀');
   });
   ```

9. **Start the server**:

   ```bash
   node server.js
   ```

   If everything goes well, you will see `Server listening on port 3000! 🚀` in the terminal.

10. **Test the routes** in your browser or with a tool like `curl`:
    - `http://localhost:3000/one`
    - `http://localhost:3000/two`
    - `http://localhost:3000/three`

You should see:

- **Route /one**: Inline HTML saying “Hello from route one! 👋”.
- **Route /two**: Renders the `two.html` file with its `<h1>`.
- **Route /three**: Redirects to `https://www.missionlocal.org`.

---

## Final Project Structure

When you’re done, your `first-server` folder should look like this:

```
first-server/
├─ package.json
├─ package-lock.json
├─ server.js
└─ public/
   └─ two.html
```

**All set!** You now have a basic HTTP server using Node.js and Express that handles multiple routes, serves static content, redirects, and logs incoming requests.

Feel free to extend this with more routes, advanced templating, or even a database. Happy coding! 💫
