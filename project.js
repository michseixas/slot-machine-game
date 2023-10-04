
// Disclaimer! I, Mich, do not support gambling. I am just coding different projects that look cool for me. =D 

// Game logic:
// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won 
// 6. Give the user their winnings
// 7. Play again


// function deposit () {  
// }
// deposit()


const prompt = require("prompt-sync")(); //require the package, then give you access to the function to get user info

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = { //value of each symbol
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOLS_VALUES = {
    A: 5, //if I have a line of As, multiply the bet by 5, etc....
    B: 4,
    C: 3,
    D: 2
}



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

const getBet = (balance, lines) => {  // need to pass a balance (parameter) when I call it 
    while (true) {
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet); //convert string to number
        
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet, try again.");
        } else {
            return numberBet;
        }
        }
}

const spin = () => { //all the possible symbols inside an array, randomly select them in the array, and then remove them 
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) { 
        for (let i = 0; i < count; i ++) {
            symbols.push(symbol);
        }
    } 

 //copy the symbols that we have available to choose for each reel into another array. 
 //Once the symbol is randomly picked, it is added to the reel, and must then 
 // be removed from the available symbols to continue to select. They have to be removed so they are not picked again.
 //But when we move on to the next reel, we must still have the symbols available for the next reel, so the symbols must be removed from a list specific to each reel.
 //Each reel hast their on symbols that they can pick from. So we need to have a copy of the symbols (reelSymbols) that we are manipulating inside the for loop. =D
    
 const reels = []; //for every single column (reel). Once we add it, we can push elements inside of that reel
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols]; //copy all of the available symbols that we have
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length); //we pick one of the symbols that are available
            const selectedSymbol = reelSymbols[randomIndex];//selecting the symbol at this random index
            reels[i].push(selectedSymbol); //pushing into the interior array the selected symbol
            reelSymbols.splice(randomIndex, 1); // and then removing it so that we don't select it again
        }
    }

    return reels;
};


//TRANSPOSING A MATRIX
const transpose = (reel) => {
    const rows = [];
    //for loop that goes through the number of rows that we have, 
    //for each row (row 0, 1, 2, etc...)we are gonna collect all the elements 
    //from our columns that are in that row and then push that into the rows' arrays
    for (let i = 0; i < ROWS; i++) { // for every single row, loop through every single column
        rows.push([]); //creates a new "small" array inside the big array before entering the for "j" loop
        for (let j = 0; j < COLS; j++) { // only exits the "j" loop once the for has iterated through COLS (3 times)
            rows[i].push(reels[j][i]) //push into the "small" array the value of reels in the position j, i

        }
    }
    return rows
};

//PRINTING THE ROWS
const printRows = (rows) => {
    for (const row of rows) { // we go into every single row in our rows
        let rowString = ""; //that's gonna give us an array representing the elements in that row
        for (const [i, symbol] of row.entries()){ // loop through both the index and the element that existe in this row
            rowString += symbol
            if (i != row.lenght -1) { //check if the index is the last element. If it is, don't put the pipe.
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}

//CHECK IF PLAYER WON
const getWinnings = (rows, bet, lines) => {// if the player only bet on 1, check just one row. If bet 2, two rows....
    let winnings = 0;

    for (let row = 0; row < lines; row ++) { //if the lines is 1, we are only gonna look at index 0. If lines =2, look at index 0 and 1...
        const symbols = rows[row];
        let allSame = true; //if we find that one of the symbols is not the same, we are gonna make this variable false, and use that later to determine if the user won in this specific row.

        for (const symbol of symbols) { //loop through every symbol that I have
            if (symbol != symbols[0]){ //if every single symbol that I have is the same as the first symbol, all of them are gonna be the same. (use the first symbol as a start to compare to the rest, aka index 0)
                allSame = false; //if one is not the same, break out of the loop. No need to continue looping.
                break; //out!  :)
            }
        }

        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]]// multiply by the value of the symbol. We are grabbing index 0, as we know all of them must be the same (they could all be the same as index 1 or 2 also!)
        }
    }

    return winnings;
}




let balance = deposit();
console.log("Here is the deposited amount: ", balance);

const numberOfLines = getNumberOfLines();
console.log("Number of lines chosen: ", numberOfLines);

const bet = getBet(balance, numberOfLines);
console.log(`Your bet per line is ${bet} and your total bet is ${bet*numberOfLines}`);

const reels = spin();
console.log("reels --->", reels);

const rows = transpose(reels);
console.log("rows --->",rows);

printRows(rows);

const winnings = getWinnings(rows, bet, numberOfLines);
console.log("You won, $" + winnings.toString());