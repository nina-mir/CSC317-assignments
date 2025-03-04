# JavaScript Objects and File Handling Activity 🎨📝

In this activity, you will work with JavaScript objects and practice writing/appending data to a file using Node.js. Follow the steps below carefully and use the hints provided to complete the tasks.

### Deliverables: Submit a JS file to Canvas before midnight tonight!

Let's get started! 🚀

---

## Step 1: Create a JavaScript Object for Colors 🌈

Create a JavaScript object where the **keys** are the names of 5 colors and the **values** are their corresponding hex codes.

### Example:
```javascript
const colors = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  yellow: "#FFFF00",
  purple: "#800080"
};
```

#### Hint:
- Use the const keyword to declare the object.

- You can find hex codes for colors online (e.g., HTML Color Codes).

## Step 2: Write the Colors Object to a File 📂

Use the fs.writeFileSync method to write the colors object to a file named preferences.info.

### Example:

```
const fs = require('fs');

fs.writeFileSync('preferences.info', JSON.stringify(colors));
```

#### Hint:
- Use JSON.stringify() to convert the object to a string before writing it to the file.

- Don't forget to require the fs module at the top of your script.


## Step 3: Create a Midterm Topics Object 📚
Create another JavaScript object called midtermTopics with the following keys: HTML, CSS, and JavaScript. Populate the values with topics you think will be asked in the midterm for each subject.

### Example:

```
const midtermTopics = {
  HTML: "Semantic Tags",
  CSS: "Flexbox",
  JavaScript: "Loops"
};
```

#### Hint:
Think about the topics you've studied so far in each subject.

Be creative! There's no wrong answer here.

## Step 4: Append the Midterm Topics Object to the File 📝
Append the midtermTopics object to the same preferences.info file.

### Example:

```
fs.appendFileSync('preferences.info', '\n' + JSON.stringify(midtermTopics));
```
#### Hint:
- Use fs.appendFileSync to add content to the file without overwriting it.

- Add a newline (\n) before appending to keep the file organized.

## Step 5: Consolidate the Two Objects into One 🔗

Create a new object called consolidated that combines the colors and midtermTopics objects into one. You can use a looping technique or any other method you prefer.

### Example:
```javascript
const consolidated = { ...colors, ...midtermTopics };
```
#### Hint:
-Use the spread operator (...) to merge the objects.

-Alternatively, you can loop through the keys of both objects and add them to a new object.

For more help, check out the MDN documentation on Objects.

## Final Output 🎉

After completing all the steps, your ```preferences.info``` file should look something like this:

```
{"red":"#FF0000","green":"#00FF00","blue":"#0000FF","yellow":"#FFFF00","purple":"#800080"}
{"HTML":"Semantic Tags","CSS":"Flexbox","JavaScript":"Loops"}
```

And your ```consolidated``` object should look like this:

```
{
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  yellow: "#FFFF00",
  purple: "#800080",
  HTML: "Semantic Tags",
  CSS: "Flexbox",
  JavaScript: "Loops"
}
```
## Bonus Challenge 💡

- Try reading the preferences.info file using fs.readFileSync and log its contents to the console.

- Explore other methods in the fs module, such as fs.unlinkSync to delete the file.

Happy coding! 😄