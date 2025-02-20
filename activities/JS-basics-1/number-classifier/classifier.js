
// Step 1: Declare a variable for input
let inputValue = 42; // Change this to test different values

// Step 2: Check if input is a number
if (typeof inputValue !== "number" && typeof inputValue !== "bigint") {
    console.log("Not a valid datatype!");
} else if (typeof inputValue === "bigint") {
    console.log("Input number is not of Number datatype but it is BigInt.");
} else {
    console.log("Proceeding with classification...");

    // Step 3: Define classification limits
    let limits = {
        verySmall: 10,
        small: 100,
        large: 1000
    };

    // Step 4: Classify the number
    if (inputValue < limits.verySmall) {
        console.log("Very small number");
    } else if (inputValue < limits.small) {
        console.log("Small number");
    } else if (inputValue < limits.large) {
        console.log("Large number");
    } else {
        console.log("Very large number");
    }
}
