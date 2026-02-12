# JavaScript Hands-On Exercises: Types + Functions (with Hints + Solutions)

> Run these in Node.js: `node exercise-file.js`  
> Tip: Use `console.log()` a lot and predict outputs before running.

---

## Exercise 1 — `typeof` surprises (and confirmations)

**Task:** For each value, log:
1) the value  
2) `typeof value`  
3) (bonus) whether it’s an array using `Array.isArray`

Values to test:
- `null`
- `undefined`
- `42`
- `NaN`
- `42n`
- `"hello"`
- `true`
- `Symbol("x")`
- `{ a: 1 }`
- `[1, 2, 3]`
- `function () {}`

**Hint:** `typeof null` is the classic “wait, what?” in JS.

---

## Exercise 2 — `null` vs `undefined` in the real world

**Task:** Predict and then run these:

```js
const user = { name: "Ada" };

console.log(user.age);              // ?
console.log("age" in user);         // ?
console.log(user.age === undefined);// ?

user.age = null;

console.log(user.age);              // ?
console.log("age" in user);         // ?
console.log(user.age === null);     // ?
````

**Hint:** `"key" in obj` checks if the property exists (even if its value is `undefined` or `null`).

---

## Exercise 3 — Numbers vs BigInt (and what breaks)

**Task:** Try these lines and note what works and what throws:

```js
const big = 9007199254740993n;
const num = 9007199254740993;

console.log(num); 
console.log(big);

console.log(num + 1);   // ?
console.log(big + 1n);  // ?

// Try mixing them:
console.log(big + 1);   // ?
```

**Hint:** BigInt and Number don’t mix in arithmetic without converting.

---

## Exercise 4 — Functions are values (higher-order practice)

**Task:** Implement a function `applyTwice(fn, value)` that applies `fn` two times.

Example behavior:

* `applyTwice(x => x + 1, 0)` → `2`
* `applyTwice(s => s + "!", "hi")` → `"hi!!"`

Starter:

```js
function applyTwice(fn, value) {
  // TODO
}
```

**Hint:** Call `fn` like a normal function: `fn(value)`.

---

## Exercise 5 — `this` depends on the call site

**Task:** Predict the output, then run:

```js
const obj = {
  id: 999,
  showId: function () {
    console.log("A:", this.id);
  }
};

const obj2 = { id: 2, showId: obj.showId };

obj.showId();   // A: ?
obj2.showId();  // A: ?

const detached = obj.showId;
detached();     // A: ?
```

**Hint:** In Node.js (not strict), a detached normal function call may use the global object; in strict mode, `this` becomes `undefined`. Try adding `"use strict";` at the top!

---

## Exercise 6 — Arrow functions and `this` (lexical binding)

**Task:** Predict the output:

```js
const obj = {
  id: 10,
  normal: function () {
    return function () {
      console.log("normal->inner:", this.id);
    };
  },
  arrow: function () {
    return () => {
      console.log("arrow->inner:", this.id);
    };
  }
};

const a = obj.normal();
const b = obj.arrow();

a(); // ?
b(); // ?
```

**Hint:** Arrow functions don’t get their own `this`. They capture `this` from the surrounding function.

---

# ✅ Solutions

## Solution 1 — `typeof` surprises

```js
const values = [
  null,
  undefined,
  42,
  NaN,
  42n,
  "hello",
  true,
  Symbol("x"),
  { a: 1 },
  [1, 2, 3],
  function () {}
];

for (const v of values) {
  console.log("value:", v);
  console.log("typeof:", typeof v);
  console.log("isArray:", Array.isArray(v));
  console.log("------");
}

// Key takeaways:
// typeof null === "object" (historical quirk)
// arrays are objects, but Array.isArray(...) identifies them
// typeof NaN === "number"
```

---

## Solution 2 — `null` vs `undefined`

```js
const user = { name: "Ada" };

console.log(user.age);               // undefined (property doesn't exist)
console.log("age" in user);          // false
console.log(user.age === undefined); // true

user.age = null;

console.log(user.age);               // null
console.log("age" in user);          // true (property exists now)
console.log(user.age === null);      // true
```

---

## Solution 3 — Number vs BigInt

```js
const big = 9007199254740993n;
const num = 9007199254740993;

console.log(num); // may print 9007199254740992 due to precision limits
console.log(big); // exact bigint

console.log(num + 1);  // may not behave as expected for large integers
console.log(big + 1n); // exact

// Mixing types throws:
try {
  console.log(big + 1);
} catch (e) {
  console.log("Error mixing BigInt + Number:", e.message);
}

// If you want to combine, convert explicitly:
console.log(Number(big) + 1); // may lose precision!
console.log(big + BigInt(1)); // safe bigint math
```

---

## Solution 4 — `applyTwice`

```js
function applyTwice(fn, value) {
  return fn(fn(value));
}

console.log(applyTwice(x => x + 1, 0));      // 2
console.log(applyTwice(s => s + "!", "hi")); // "hi!!"
```

---

## Solution 5 — `this` depends on the call site

```js
const obj = {
  id: 999,
  showId: function () {
    console.log("A:", this && this.id);
  }
};

const obj2 = { id: 2, showId: obj.showId };

obj.showId();   // A: 999
obj2.showId();  // A: 2

const detached = obj.showId;
detached();     // In sloppy mode: likely A: undefined (or global id if set)
                // In strict mode: this is undefined, so this.id would crash unless guarded
```

> If you remove the safety guard (`this && this.id`) and run strict mode, `detached()` will throw because `this` is `undefined`.

---

## Solution 6 — Arrow functions capture `this`

```js
const obj = {
  id: 10,
  normal: function () {
    return function () {
      console.log("normal->inner:", this && this.id);
    };
  },
  arrow: function () {
    return () => {
      console.log("arrow->inner:", this.id);
    };
  }
};

const a = obj.normal();
const b = obj.arrow();

a(); // normal->inner: undefined (or global id) because call site is plain a()
b(); // arrow->inner: 10 because arrow captured this from obj.arrow() call

// Want 'a' to use obj as this? Use call/bind:
a.call(obj); // normal->inner: 10
```

