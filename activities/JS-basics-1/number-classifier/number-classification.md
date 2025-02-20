# 📝 JavaScript Conditional Logic: Number Classification  

## 🎯 Objective  
In this exercise, you will build a **JavaScript program** that:  
- Takes an **input number**.  
- Compares it against predefined **limits**.  
- Uses `if-else` statements to **classify** the number as `"very small"`, `"small"`, `"large"`, or `"very large"`.  
- Handles **BigInt** values differently.  
- Checks for **invalid datatypes**.  

By completing each step, you will improve your **logic-building skills** and **understand type checking in JavaScript**.  

---

## 📌 **Tasks**

### **1️⃣ Declare a Variable for Input**
1. Declare a variable `inputValue` and assign it a **numeric value**.  
2. Print its value using `console.log()`.  

📖 **Reference:** [MDN Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  

---

### **2️⃣ Check If Input is a Number**
1. Use `typeof` to check whether `inputValue` is a **number**.  
2. Print `"Valid number"` if it is of type `"number"`.  
3. Otherwise, print `"Not a valid datatype!"`.  

📖 **Reference:** [MDN typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)  

---

### **3️⃣ Add BigInt Handling**
1. Modify your program to check if `inputValue` is a **BigInt**.  
2. If it is, print: `"Input number is not of Number datatype but it is BigInt."`  
3. Otherwise, print `"Proceeding with classification..."`.  

📖 **Reference:** [MDN BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)  

---

### **4️⃣ Define Classification Limits**
1. Define the following limits:  
   - **Very Small:** `< 10`  
   - **Small:** `10 - 99`  
   - **Large:** `100 - 999`  
   - **Very Large:** `>= 1000`  
2. Print each limit using `console.log()`.  

---

### **5️⃣ Implement If-Else Classification**
1. Use **if-else statements** to classify `inputValue` based on the predefined limits.  
2. Print:  
   - `"Very small number"` if `< 10`  
   - `"Small number"` if between `10 - 99`  
   - `"Large number"` if between `100 - 999`  
   - `"Very large number"` if `>= 1000`  

📖 **Reference:** [MDN if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)  

---

### **6️⃣ Final Touches: Handle All Edge Cases**
1. Ensure your program correctly prints:  
   - `"Not a valid datatype!"` for **non-numbers**.  
   - `"Input number is not of Number datatype but it is BigInt."` for **BigInt values**.  
   - The correct **classification message** for valid numbers.  
2. Test with:  
   - `42` (small number)  
   - `10000` (very large number)  
   - `"hello"` (invalid)  
   - `BigInt(9999999999999999)` (BigInt case)  

---

## 🎯 **Final Challenge**
- Modify your program so the **classification limits** are stored in an **object** instead of hardcoded values.  
- Example:  
  ```js
  let limits = {
      verySmall: 10,
      small: 100,
      large: 1000
  };
