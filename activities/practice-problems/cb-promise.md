# Practice Exercise: Callbacks and Promises in JavaScript/Node.js

## overview

- Callbacks are used to handle asynchronous operations in JavaScript by passing a function that gets called once the operation is complete (or upon error).

- Promises (with or without async/await) provide a more flexible and often cleaner method of chaining and handling async operations.

Understanding both approaches is crucial for older codebases (callbacks) and newer code (promises/async-await).

These exercises provide a hands-on way to see how to:

- Access the filesystem in Node.

- Delay execution with setTimeout.

- Structure data processing with callbacks.

- Convert callback-based code to Promises.
<hr>
This exercise will help you practice working with callbacks and promises in JavaScript, particularly focusing on Node’s <b>fs module</b>. There are four short questions in total.
<hr>

## Question 1: Using `fs` with Callbacks

Write a small Node.js script that reads a file called `example.txt` (you can create this file yourself with some sample text). Use the `fs` module **with a callback** to:
1. Read the file contents.
2. Print the contents to the console.

### Hints
- Remember to `require('fs')`.
- Check the documentation for `fs.readFile` if you're unsure of the method signature.
- `fs.readFile` requires parameters like the `path`, the `encoding`, and a callback function.
- The callback has the form `(error, data) => { ... }`.

## Question 2: Using `fs` with Promises

Re-write the same file-reading logic from **Question 1**, but this time use the **Promise-based** approach. You can do this by:
- Using the `fs.promises` API. [Use this for in-class activity!]
- Or by using the built-in `util.promisify` on `fs.readFile`. [Try this at home!]

**Again**, read `example.txt` and print out its contents.

### Hints
- Check out `const fsPromises = require('fs').promises;`
- The `fs.promises.readFile` method returns a `Promise`, so you can handle it with either `.then(...).catch(...)` or `async/await`.

## Question 3: Simulating a Delayed Operation with Callbacks

Create a function called `delayedGreeting` that:
1. Accepts a string (`message`) and a number (`delayInMilliseconds`), along with a **callback** function.
2. Uses `setTimeout` to wait for the specified `delayInMilliseconds`.
3. After the delay, the function invokes the callback, passing in the `message`.

Then, call `delayedGreeting` with a custom message (e.g., `"Hello, CSC 317!"`) and a delay of 2000 (2 seconds). Inside the callback, you should console.log the message.

### Hints
- The signature can look like:
  ```js
  function delayedGreeting(message, delay, callback) {
    // ...
  }

- setTimeout requires a callback function and the time in milliseconds.

- Make sure you call the callback only after the time has passed.

## Question 4: Simple Data Processing with a Callback
Create a function called processNumbers that:

1. Takes an array of numbers and a callback as arguments.

2. In the function, calculate the sum of those numbers (or any simple transformation you want).

3. Invoke the callback with the result.

Example usage might look like:

```js
processNumbers([1, 2, 3, 4], (result) => {
  console.log("Result:", result);
});
```

The console should display the sum of these numbers.

### Hints
- Make sure you iterate over the array to compute the sum (e.g., using a for loop or array methods like reduce).

- The callback might have the form (result) => { ... }.

- Keep it simple – no need to do anything asynchronous here. The goal is just to practice how callbacks are structured.