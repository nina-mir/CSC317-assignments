# 🌟 JavaScript Learning Activity

Welcome to this activity on learning **basic JavaScript programming language fundamentals**!  
You will explore:

1. `if...else` blocks and conditional loops  
2. Functions with inputs, outputs, and default parameters  
3. Objects in JS and looping through their keys/values  
4. Looping through arrays  
5. Hands-on activities with examples using **HTTP verbs** and **HTTP status codes** as data  

---

## 1. If...Else Blocks

The `if...else` block lets your code make **decisions**.

```js
let statusCode = 200;

if (statusCode === 200) {
  console.log("OK - Request succeeded.");
} else if (statusCode === 404) {
  console.log("Not Found - The resource could not be found.");
} else {
  console.log("Other status code.");
}
````

👉 **Reference:** [MDN: if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)

### ✨ Activity 1:

Write a program that checks an `httpMethod` variable (with values like `"GET"`, `"POST"`, `"DELETE"`).

* If it’s `"GET"`, log `"Fetching resource"`.
* If it’s `"POST"`, log `"Creating resource"`.
* Otherwise, log `"Unsupported method"`.

---

## 2. Conditional Loops (`for`, `while`)

Loops let us repeat actions until conditions are met.

```js
let attempts = 0;
while (attempts < 3) {
  console.log("Trying request...");
  attempts++;
}
```

👉 **Reference:** [MDN: Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)

### ✨ Activity 2:

Write a loop that prints `"Checking server..."` **5 times**.

---

## 3. Functions (Inputs, Outputs, Defaults)

Functions can take **parameters** and optionally return values.

```js
function getStatusMessage(code = 500) {
  if (code === 200) {
    return "Success!";
  } else if (code === 404) {
    return "Not Found.";
  } else {
    return "Error.";
  }
}

console.log(getStatusMessage(200)); // Success!
console.log(getStatusMessage());    // Default -> Error.
```

👉 **Reference:** [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

### ✨ Activity 3:

Write a function `describeMethod(method = "GET")` that:

* Returns `"Safe method"` if the method is `"GET"`
* Returns `"Modifying method"` if `"POST"`
* Returns `"Other method"` otherwise

---

## 4. Objects and Looping Keys/Values

Objects store **key-value pairs**.

```js
let httpResponses = {
  200: "OK",
  201: "Created",
  404: "Not Found",
};

for (let code in httpResponses) {
  console.log(`${code}: ${httpResponses[code]}`);
}
```

👉 **Reference:** [MDN: for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)

### ✨ Activity 4:

Create an object with 3 HTTP status codes and their messages.
Loop through it and print:
`"Status <code> means <message>"`.

---

## 5. Arrays and Looping

Arrays store **ordered lists**.

```js
let methods = ["GET", "POST", "DELETE"];

methods.forEach((m) => {
  console.log("HTTP Method:", m);
});
```

👉 **Reference:** [MDN: Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

### ✨ Activity 5:

Create an array of 4 HTTP methods (`"GET"`, `"POST"`, `"PUT"`, `"DELETE"`).
Loop through the array and print `"Allowed method: <method>"`.

---

# 📝 ANSWERS

### ✅ Activity 1

```js
let httpMethod = "POST";

if (httpMethod === "GET") {
  console.log("Fetching resource");
} else if (httpMethod === "POST") {
  console.log("Creating resource");
} else {
  console.log("Unsupported method");
}
```

### ✅ Activity 2

```js
for (let i = 0; i < 5; i++) {
  console.log("Checking server...");
}
```

### ✅ Activity 3

```js
function describeMethod(method = "GET") {
  if (method === "GET") {
    return "Safe method";
  } else if (method === "POST") {
    return "Modifying method";
  } else {
    return "Other method";
  }
}

console.log(describeMethod("GET"));   // Safe method
console.log(describeMethod("POST"));  // Modifying method
console.log(describeMethod("PATCH")); // Other method
```

### ✅ Activity 4

```js
let statusCodes = {
  200: "OK",
  403: "Forbidden",
  500: "Server Error",
};

for (let code in statusCodes) {
  console.log(`Status ${code} means ${statusCodes[code]}`);
}
```

### ✅ Activity 5

```js
let methods = ["GET", "POST", "PUT", "DELETE"];

methods.forEach((method) => {
  console.log(`Allowed method: ${method}`);
});
```

---

🎉 Congratulations! You now know the basics of:

* `if...else` blocks
* Loops (`for`, `while`, `forEach`)
* Functions with default parameters
* Objects and arrays

Keep practicing to get fluent in JS!

