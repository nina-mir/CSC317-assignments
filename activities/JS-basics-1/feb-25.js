'use strict'

let inputVar = 1000

function checkStringLength(input){
    if (typeof input == 'string'){
        console.log(`Length of the input ${inputVar} is ${inputVar.length}.`)
    } else{
        console.error(`Input type of ${typeof input} is wrong. A string type is required.`)
    }
}

checkStringLength(inputVar)