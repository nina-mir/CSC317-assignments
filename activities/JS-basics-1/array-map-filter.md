# JavaScript Activity: `Array.map()` and `Array.filter()`

## Objective
In this activity, you will learn how to use JavaScript's `Array.map()` and `Array.filter()` methods by working with a dataset of international students enrolled in various computer science courses.

## Scenario
You are given a dataset of international students, including their names, country, academic year, and grades in different computer science courses. Your task is to process this dataset using `map()` and `filter()` to extract meaningful insights.

---

## Given Dataset (Example)
```javascript
const students = [
  { name: "Alice", country: "Germany", year: 2, grades: { algorithms: 85, databases: 78 } },
  { name: "Carlos", country: "Brazil", year: 3, grades: { algorithms: 92, databases: 88 } },
  { name: "Fatima", country: "Egypt", year: 1, grades: { algorithms: 75, databases: 70 } },
  { name: "Wei", country: "China", year: 4, grades: { algorithms: 90, databases: 85 } },
  { name: "John", country: "USA", year: 2, grades: { algorithms: 65, databases: 60 } }
];
```

---

## Tasks

### Task 1: Extract Student Names and Their Grades in Algorithms
Using `map()`, create a new array that contains objects with only the student names and their grades in the "algorithms" course.

**Example Output:**
```javascript
[
  { name: "Alice", algorithms: 85 },
  { name: "Carlos", algorithms: 92 },
  { name: "Fatima", algorithms: 75 },
  { name: "Wei", algorithms: 90 },
  { name: "John", algorithms: 65 }
]
```

#### Hint
- Use the `.map()` method to transform each object in the `students` array.
- Return a new object that contains only `name` and `grades.algorithms`.

---

### Task 2: Filter Students Who Passed Algorithms (Score >= 80)
Using `filter()`, create a new array containing only the students who scored **80 or above** in the "algorithms" course.

**Example Output:**
```javascript
[
  { name: "Alice", country: "Germany", year: 2, grades: { algorithms: 85, databases: 78 } },
  { name: "Carlos", country: "Brazil", year: 3, grades: { algorithms: 92, databases: 88 } },
  { name: "Wei", country: "China", year: 4, grades: { algorithms: 90, databases: 85 } }
]
```

#### Hint
- Use the `.filter()` method to keep only students where `grades.algorithms >= 80`.

---

### Task 3: Extract Names of Senior Students (Year 3 and Above)
Using `filter()`, create an array of names of students who are in **year 3 or above**.

**Example Output:**
```javascript
["Carlos", "Wei"]
```

#### Hint
- Use `.filter()` to select students in year 3 or higher.
- Use `.map()` to extract only the `name` property.

---

## Submission
- Solve each task in a separate JavaScript file.
- Test your solutions using `console.log()`.
- Ensure your functions handle different datasets.

---

## Useful Links
- [`Array.map()` - MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [`Array.filter()` - MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

Happy coding! 🚀

