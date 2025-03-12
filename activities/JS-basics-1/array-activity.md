# JavaScript Activity: Hands-on practice Array.map() and Array.filter() + a bit more!

### deliverable: Submit one JS code to Canvas by the due deadline!

## Introduction
In this activity, you will work with JavaScript's `Array.map()` and `Array.filter()` methods to manipulate and analyze an array of notable scientists. You will also explore `Array.find()`, `Array.findIndex()`, and `Array.every()` through additional challenges.

## Dataset
We will work with the following dataset, an array of objects representing famous scientists:

```javascript
const people = [
  { id: 0, name: 'Creola Katherine Johnson', profession: 'mathematician', accomplishment: 'spaceflight calculations', imageId: 'MK3eW3A' },
  { id: 1, name: 'Mario José Molina-Pasquel Henríquez', profession: 'chemist', accomplishment: 'discovery of Arctic ozone hole', imageId: 'mynHUSa' },
  { id: 2, name: 'Mohammad Abdus Salam', profession: 'physicist', accomplishment: 'electromagnetism theory', imageId: 'bE7W1ji' },
  { id: 3, name: 'Percy Lavon Julian', profession: 'chemist', accomplishment: 'pioneering cortisone drugs, steroids and birth control pills', imageId: 'IOjWm71' },
  { id: 4, name: 'Subrahmanyan Chandrasekhar', profession: 'astrophysicist', accomplishment: 'white dwarf star mass calculations', imageId: 'lrWQx8l' }
];
```

## Tasks

### Task 0: Data Cleaning
Before performing operations, remove the `imageId` key from all objects using `map()`. The cleaned array should not contain the `imageId` property.

**Hint:** Use `map()` to return a new array with modified objects.

### Task 1: Categorizing Scientists
Using the `filter()` method, create two separate arrays:
- One containing only chemists.
- Another containing everyone else.

**Hint:** Check the `profession` property to determine if a person is a chemist.

### Task 2: Filtering Based on the number of tokens in each person's name
Filter out people whose name consists of exactly **three tokens**.

**Hint:** Use `.split(' ')` on the `name` property to count the number of tokens in the name.

### Task 3: Exploring More Array Methods
Try the following:
1. Use `Array.find()` to find the first scientist who is a physicist.
2. Use `Array.findIndex()` to determine the index of the first astrophysicist in the array.
3. Use `Array.every()` to check if all scientists have a defined `profession`.

**Hint:** Refer to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) for method details.

---

Happy coding! 🚀