# JavaScript Activity: Text Splitter Function

## Objective
Create a JavaScript function named `textSplitter` that:
- Takes **two parameters**:
  1. A **text string**.
  2. A **delimiter** (a character or phrase used to split the text).
- Returns an **array of substrings** based on the given delimiter.

## Instructions
1. Define a function named `textSplitter`.
2. Inside the function, use JavaScript's built-in **String.prototype.split()** method to divide the text.
3. Ensure the function works for different delimiters (e.g., `,`, `;`, spaces, and words).
4. Return the resulting array.

## Example Usage
```javascript
function textSplitter(text, delimiter) {
    return text.split(delimiter);
}

console.log(textSplitter("apple,banana,grape", ","));
// Output: ["apple", "banana", "grape"]

console.log(textSplitter("Hello world! How are you?", " "));
// Output: ["Hello", "world!", "How", "are", "you?"]

console.log(textSplitter("This--is--a--test", "--"));
// Output: ["This", "is", "a", "test"]
```

## Hints
- Use the **`.split(delimiter)`** method for splitting strings. Read more about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split).
- Be careful when using special characters as delimiters (e.g., `.` or `|`), as they might require **escaping** in **regular expressions**. [Ignore this for now since we aren't do regex in this activity!]
- Test your function with **different types of delimiters**, such as single characters, spaces, and full words.

## Additional Resources
- [MDN: String.split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [MDN: JavaScript String Manipulation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings)

## Submission
- Write and test your function in a `.js` file.
- Ensure your function handles various delimiters properly.
- Submit your completed function.

🚀 **Happy Coding!**

