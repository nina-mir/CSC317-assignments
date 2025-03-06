# JavaScript Practice Problems

## Problem 1: Add Key-Value to an Object

### Description
Create a function in JavaScript that takes in **three arguments**:
- `object` (an existing object)
- `key` (a string representing the key to be added)
- `value` (the value associated with the key)

The function should add the key-value pair to the object and return the updated object.

### Example Usage
```javascript
const obj = { name: "Alice" };
const newObj = addKeyValue(obj, "age", 25);
console.log(newObj);
// Expected output: { name: "Alice", age: 25 }
```

### Hints
- JavaScript objects are **mutable**, so modifying an object inside a function will affect it globally.
- Consider using **bracket notation** (`object[key] = value`) to add dynamic properties.
- Return the modified object after adding the key-value pair.

---

## Problem 2: Delete a Key from an Object

### Description
Create a function that takes **two parameters**:
- `obj` (an object)
- `key` (a string representing the key to be removed)

The function should **delete** the key-value pair from the object **if the key exists**. If the key does not exist, the function should throw an **error** stating that the key does not exist.

### Example Usage
```javascript
const obj = { name: "Alice", age: 25 };
deleteKey(obj, "age");
console.log(obj);
// Expected output: { name: "Alice" }
```

### Hints
- Use the `delete` operator to remove a property from an object.
- Before deleting, **check if the key exists** using `Object.hasOwnProperty()` or `key in obj`.
- If the key does not exist, throw an `Error("Key does not exist in the object")`.

---

## Problem 3: Create HTML Elements

### Description
Create a function that takes **two arguments**:
- `elementString` (a string that must be either `<li>`, `<div>`, `<p>`, or `<a>`)
- `quantity` (a number representing how many elements to create)

The function should create **the specified number of HTML elements** and return them as an **array**. If the `elementString` is not one of the allowed elements, the function should throw an error stating **"input element is not supported"**.

### Example Usage
```javascript
const elements = createElements("div", 3);
console.log(elements);
// Expected output: [<div></div>, <div></div>, <div></div>]
```

### Hints
- Use `document.createElement()` to create HTML elements in JavaScript.
- Use a **loop** to create multiple elements.
- Store created elements in an **array** and return it.
- If the `elementString` is not one of the allowed values, throw an error using `throw new Error("input element is not supported")`.

---

## Submission
- Solve each problem in a separate JavaScript file.
- Test your solutions using `console.log()`.
- Ensure your functions handle **edge cases**, such as invalid input types.
- Submit your JavaScript files along with a brief explanation of your approach.

Happy coding! 🚀

