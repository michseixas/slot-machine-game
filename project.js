
// Disclaimer! I, Mich, do not support gambling. I am just coding different projects that look cool for me. =D 

// Game logic:
// 1. Deposit some money
// 2. determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won 
// 6. Give the user their winnings
// 7. Play again


// function deposit () {  
// }
// deposit()


const prompt = require("prompt-sync")(); //require the package, then give you access to the function to get user info


const deposit = () => {
    while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount); //convert string to number
    
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
        console.log("Invalid deposit amount, try again.");
    } else {
        return numberDepositAmount;
    }
    }
};

const getNumberOfLines = () => {
    while (true) {
    const lines = prompt("Enter the number of lines to bet on (1 - 3): ");
    const numberOfLines = parseFloat(lines); //convert string to number
    
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
        console.log("Invalid number of lines, try again.");
    } else {
        return numberOfLines;
    }
    }
};

const depositAmount = deposit();
console.log("Here is the deposited amount: ", depositAmount);

const numberOfLines = getNumberOfLines();
console.log("Number of lines chosen: ", numberOfLines);

