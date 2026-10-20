# JavaScript Data Types & Functions

## 1️⃣ JavaScript Data Types

JavaScript is a **loosely typed, dynamic language**.
There are **7 primitive data types**.
Everything else (arrays, functions, objects) is an **object**.

---

## 🔹 Primitive Types

### 1. Null

```js
null
```

Represents the **intentional absence of an object**.

---

### 2. Undefined

```js
undefined
```

Represents the **absence of a defined value**.

* A variable declared but not assigned → `undefined`
* Accessing a non-existent property → `undefined`
* A function without `return` → returns `undefined`

---

### 3. Number

```js
1
1.5
-1e4
NaN
```

* Stored as **double-precision floating point**
* Safe integer range:
  `-(2^53 - 1)` to `(2^53 - 1)`

---

### 4. BigInt

```js
1n
9007199254740993n
```

* Used for **very large integers**
* No upper or lower limit

---

### 5. String

```js
'hello'
"hello"
`hello ${name}`
```

* Single `' '` or double `" "` quotes → normal strings
* Backticks `` ` ` `` → **template strings**

  * Support interpolation: `${variable}`
  * Can span multiple lines

---

### 6. Boolean

```js
true
false
```

---

### 7. Symbol

```js
Symbol('description')
Symbol.for('namespace')
```

* Used as **unique object property keys**
* `Symbol.for()` creates/gets a global symbol

---

## 🧱 Objects

Everything that is not a primitive is an **object**.

An object is a collection of **key–value pairs**:

```js
const obj = {
  myKey: {
    thisIs: 'a nested object'
  }
}

console.log(obj.myKey)
```

* Keys are called **properties**
* Values can be primitives or other objects
* Objects can be **nested**

---

## 🧬 Prototypes (Important!)

All JavaScript objects have a **prototype**.

When you access a property:

1. JS looks on the object itself
2. If not found → checks its prototype
3. Continues up the prototype chain

This is called **prototypal inheritance**.

---

# 2️⃣ Functions in JavaScript

Functions are **first-class citizens**.

This means:

* They are **objects**
* They can be stored in variables
* Passed as arguments
* Returned from other functions

---

## 🔹 Returning a Function

```js
function factory() {
  return function doSomething() {}
}
```

---

## 🔹 Passing a Function

```js
setTimeout(function () {
  console.log('hello from the future')
}, 100)
```

---

## 🔹 Functions as Object Properties

```js
const obj = {
  id: 999,
  fn: function () {
    console.log(this.id)
  }
}

obj.fn() // 999
```

### 🔎 Understanding `this`

`this` refers to the **object that calls the function**,
NOT where the function was originally defined.

```js
const obj = { id: 999, fn: function () { console.log(this.id) } }
const obj2 = { id: 2, fn: obj.fn }

obj2.fn() // 2
obj.fn()  // 999
```

Same function → different calling object → different `this`.

---

## 🔹 Setting `this` Manually with `.call()`

```js
function fn() { console.log(this.id) }

const obj = { id: 999 }
const obj2 = { id: 2 }

fn.call(obj2) // 2
fn.call(obj)  // 999
fn.call({ id: ':)' }) // :)
```

`.call()` sets the `this` context explicitly.

---

# ➡️ Arrow Functions (Fat Arrow Functions)

```js
const add = (a, b) => a + b

const cube = (n) => {
  return Math.pow(n, 3)
}
```

### Important Differences

### ✅ Implicit Return

If no `{}` → expression is automatically returned.

---

### ❗ No Own `this`

Arrow functions **do NOT have their own `this`**.

They inherit `this` from the nearest parent **non-arrow function**.

```js
function fn() {
  return (offset) => {
    console.log(this.id + offset)
  }
}

const obj = { id: 999 }
const offsetter = fn.call(obj)

offsetter(1) // 1000
```

---

### ❗ No Prototype

```js
function normalFunction() {}
const arrowFunction = () => {}

console.log(typeof normalFunction.prototype) // 'object'
console.log(typeof arrowFunction.prototype)  // 'undefined'
```

* Normal functions have a `prototype`
* Arrow functions do NOT
* Arrow functions cannot be used as constructors

---

# ✅ Summary

* JavaScript has **7 primitive types**
* Everything else is an **object**
* Objects use **prototypes** for inheritance
* Functions are **objects**
* `this` depends on how a function is called
* Arrow functions:

  * Have implicit return (sometimes)
  * Do not bind their own `this`
  * Have no `prototype`

---
