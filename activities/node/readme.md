# 📂 Intro to Node.js `fs` Module  

## 🎯 Objectives  
By the end of this guide, you will:  
- Understand how to use the `fs` module to **read and write files** in **synchronous mode**.  
- Learn about **different file writing modes** and **encoding types**.  
- Practice using `fs` through a **guided hands-on exercise**.  

---

## 📌 1️⃣ Working with the `fs` Module  

The `fs` (**File System**) module in Node.js allows you to **read from and write to files** on your system.  

📖 **Official Docs:** [Node.js fs Module](https://nodejs.org/api/fs.html)  

### **🔹 Importing the `fs` Module**
Before working with files, first **import the `fs` module** in your Node.js script:  
```js
const fs = require("fs");
```


### 🔹 Writing to a File (Synchronous Mode)
To write to a file synchronously, use fs.writeFileSync().

```js
fs.writeFileSync("example.txt", "Hello, Node.js!", { encoding: "utf-8", flag: "w" });
console.log("File written successfully!");

```

### ✅ Explanation:

- "example.txt" → The file name.
- "Hello, Node.js!" → Content written to the file.
- { encoding: "utf-8", flag: "w" } → Options:
- encoding: "utf-8" → Defines text encoding.
- flag: "w" → Write mode (overwrites existing content).

#### 🔹 Other Write Modes:

    - "w"	     Write (default). Overwrites existing content.
    - "a"	     Append mode. Adds new content to the file without erasing previous content.
    - "r+"	     Read & write mode.

### 🔹 Reading from a File (Synchronous Mode)

To read a file synchronously, use ```fs.readFileSync()```.

```js
const data = fs.readFileSync("example.txt", { encoding: "utf-8" });
console.log("File content:", data);
```
#### ✅ Explanation:

- Reads the content of "example.txt" and stores it in data.
- { encoding: "utf-8" } ensures correct character encoding.

#### 🔹 Alternative Encoding Types:

    - "utf-8"	Standard text encoding for files.
    - "ascii"	Older encoding, mainly for simple text.
    - "base64"	Useful for encoding binary data like images.


## 🏗 2️⃣ Guided Practice: Using fs in Node.js

### 🛠️ Setup Instructions
#### 1️⃣ Create a new Node.js project

```sh
mkdir node-fs-practice && cd node-fs-practice
npm init -y
```

#### 2️⃣ Create a new JavaScript file

```sh
touch fs-sync.js
```

### 🚀 Activity: Working with Files

#### Step 1: Import the fs module

Open ```fs-sync.js``` and import the ```fs``` module:

```js
const fs = require("fs");
```
#### Step 2: Write to a File


1. The output file name is ```log.txt```.

Write the following content in the exact order to the output file:

```
Log File Created: [Current Timestamp]
```

followed by the contents of ```fs-sync.js```


2. Use ```fs.writeFileSync()``` to write this data.
✅ Hint: Use Date().toString() to get the current timestamp.

#### Step 3: Append New Log Entries
Modify your script to append log entries instead of overwriting.
Append a new timestamp each time the script runs using fs.appendFileSync().

✅ Hint:
Use flag: "a" to append.

Call the script multiple times to check log updates.
📖 Reference: fs.appendFileSync()

#### Step 4: Read and Display File Content
Use ```fs.readFileSync()``` to read log.txt.
Print the file contents to the console.

### Step 5: Experiment with Encodings
Modify the write function to store the log file in Base64 encoding.
Read it back and convert it to a human-readable format.

✅ Hint: Try using { encoding: "base64" } and see what happens!

### 🎯 Reflection Questions
1. What happens when you use "w" vs "a" mode while writing to a file?
2. Why is "utf-8" the most commonly used encoding?
3. How would you handle file writing errors in a real-world application?

## ✅ Conclusion

- You learned how to read and write files in synchronous mode.
- You explored different file modes and encoding types.
- You practiced using fs with logging functionality.

📌 Next Steps:

- Try the asynchronous versions (```fs.writeFile() & fs.readFile()```).

- Experiment with error handling using ```try-catch```.
