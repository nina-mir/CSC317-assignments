# JavaScript Activity: Exploring Object.keys(), Object.values(), and Object.entries()

## Objective
In this activity, you will learn how to use JavaScript methods **Object.keys()**, **Object.values()**, and **Object.entries()** to interact with objects. You will apply these methods to a set of HTTP 500 error codes.

## Instructions

### Step 1: Understanding the Object
We have an object called `http500errors` that contains HTTP status codes (as keys) and their corresponding descriptions (as values):

```javascript
const http500errors = {
  '500': 'Internal Server Error',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
  '505': 'HTTP Version Not Supported',
  '506': 'Variant Also Negotiates',
  '507': 'Insufficient Storage',
  '508': 'Loop Detected',
  '509': 'Bandwidth Limit Exceeded',
  '510': 'Not Extended',
  '511': 'Network Authentication Required'
};
```

### Step 2: Using `Object.keys()`
The `Object.keys()` method returns an array containing all the **keys** of an object.

#### 🔹 **Task 1: Get all keys**
Use `Object.keys()` to extract and print all HTTP status codes:

```javascript
const keys = Object.keys(http500errors);
console.log(keys);
```

#### Expected Output:
```javascript
['500', '501', '502', '503', '504', '505', '506', '507', '508', '509', '510', '511']
```
📌 **Learn more**: [MDN - Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

---

### Step 3: Using `Object.values()`
The `Object.values()` method returns an array of all **values** in an object.

#### 🔹 **Task 2: Get all values**
Extract and print all descriptions of the HTTP errors:

```javascript
const values = Object.values(http500errors);
console.log(values);
```

#### Expected Output:
```javascript
[
  'Internal Server Error', 'Not Implemented', 'Bad Gateway',
  'Service Unavailable', 'Gateway Timeout', 'HTTP Version Not Supported',
  'Variant Also Negotiates', 'Insufficient Storage', 'Loop Detected',
  'Bandwidth Limit Exceeded', 'Not Extended', 'Network Authentication Required'
]
```
📌 **Learn more**: [MDN - Object.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

---

### Step 4: Using `Object.entries()`
The `Object.entries()` method returns an array of **key-value pairs**, where each item is an array `[key, value]`.

#### 🔹 **Task 3: Get all key-value pairs**
Extract and print all HTTP status codes along with their descriptions:

```javascript
const entries = Object.entries(http500errors);
console.log(entries);
```

#### Expected Output:
```javascript
[
  ['500', 'Internal Server Error'],
  ['501', 'Not Implemented'],
  ['502', 'Bad Gateway'],
  ['503', 'Service Unavailable'],
  ['504', 'Gateway Timeout'],
  ['505', 'HTTP Version Not Supported'],
  ['506', 'Variant Also Negotiates'],
  ['507', 'Insufficient Storage'],
  ['508', 'Loop Detected'],
  ['509', 'Bandwidth Limit Exceeded'],
  ['510', 'Not Extended'],
  ['511', 'Network Authentication Required']
]
```
📌 **Learn more**: [MDN - Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

---

## ✨ Bonus Challenge

Find two problems at the end of this section on Javascript.info:

[https://javascript.info/keys-values-entries](https://javascript.info/keys-values-entries)


Write a function `printHttpErrors()` that prints each HTTP error code along with its description in a readable format:

```javascript
function printHttpErrors(errors) {
    Object.entries(errors).forEach(([code, message]) => {
        console.log(`HTTP ${code}: ${message}`);
    });
}

printHttpErrors(http500errors);
```

#### Expected Output:
```javascript
HTTP 500: Internal Server Error
HTTP 501: Not Implemented
HTTP 502: Bad Gateway
HTTP 503: Service Unavailable
...
HTTP 511: Network Authentication Required
```

---

## Submission
- Run each method and observe the output.
- Try modifying the `http500errors` object by adding or removing values.
[delete operator on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete)
- Test the `printHttpErrors()` function with different objects.
- Submit your JavaScript file to Canvas.

🚀 **Happy Coding!**

