# Homework Assignment: JavaScript Object Manipulation with Node.js

due date: Feb.25.2025 3pm  [won't be extended for any reason, so start on it early.]

## 🎯Objective
In this assignment, you will practice working with JavaScript objects, arrays, and loops. You will write a script in Node.js that processes a list of objects and creates a new object based on the lengths of the values in the original objects. This will help you understand how to manipulate objects and arrays in JavaScript.
<hr/>

## deliverable
A PDF to Canvas with a link to a GitHub repo that includes the following:

file - ```sculptureScript.js``` [you write your solution here!]

file - ```data.js``` [given to you!]

file - ```readme.md``` [this file must include the content of ```sculptureListLengths``` object that you create in your solution]

file - feel free to include any other files but the above 3 are the minimum acceptable submission.

<hr/>

### Tasks

#### Step 1: Set Up Your Environment

1. Ensure you have Node.js installed on your computer. Refer the the document posted on Canvas about that!

2. Create a new folder for your project and navigate to it in your terminal or command prompt.

3. Initialize a new Node.js project by running the following command:

```npm init -y```

4. Create a new file called sculptureScript.js in your project folder. This is where you will write your JavaScript code.
<hr/>

#### Step 2: Understand the Input Data

You are given a list of objects called sculptureList that is located in the ```data.js``` file in this directory. Each object in the list has the following structure:

```javascript
{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}
```
Your task is to loop through this list and create a new object called ```sculptureListLengths```. Each key in ```sculptureListLengths``` should match the keys in the original objects, but the values should be the length of the corresponding values in the original objects.
<hr />

#### Step 3: Write the JavaScript Code

1. import the data into your script. This step is done for you! check out ```sculptureScript.js```
2. Create an empty object called sculptureListLengths to store the results.

3. Use a loop (e.g., for or forEach) to iterate through each object in sculptureList.

4. For each object in sculptureList, create a new object in sculptureListLengths with the same keys. The value for each key should be the length of the corresponding value in the original object. Use the str.length property to calculate the length. 

HINT: look into ```Object.assign()``` 

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

Example:

    If the original object has name: 'Homenaje a la Neurocirugía', the new object should have name: 24 (because the string has 24 characters).

5. After the loop, log the sculptureListLengths object to the console to verify your results.
<hr />

#### Step 4: Example Output

After running your script, the ***first element*** of ```sculptureListLengths``` object should look like this:
```javascript
{
  name: 26,
  artist: 20,
  description: 198,
  url: 31,
  alt: 90
}
```
#### Step 5: Submit Your Work

1. Run your script using Node.js to ensure it works correctly:

```javascript
node sculptureScript.js
```

2. Create a repo on GitHub with the infor given at the begining of this document and submit a PDF file to Canvas with a hyperlink to your repo

3. Make sure your readme.md file in your repo has the required info.

<hr />

### Grading Criteria

Correctness (50%): Your script must produce the correct sculptureListLengths object.

Code Quality (30%): Your code should be well-structured, readable, and use appropriate loops and object manipulation techniques.

Submission (20%): Your PDF must include the code and the screenshot of the output.

### Tips

Use ```console.log``` to debug your code and check intermediate results.

for...in  to loop throught an object string properties 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in

for...of to loop through an iterable object such as an Array 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of



Refer to the MDN Web Docs for help with JavaScript syntax and methods.