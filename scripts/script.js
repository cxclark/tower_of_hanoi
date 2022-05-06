// Instantiate a variable to hold instructions message
let subheader = 'Move all the discs from left to right one at a time. A disc cannot be placed on top of a smaller disc.'
// Grab the subheader element and set the innerHTML to the subheader variable
document.querySelector('.subheader').innerHTML = subheader.toUpperCase();

// Instantiate the three towers by grabbing the corresponding IDs in the DOM
const towerA = document.querySelector('#towerA');
const towerB = document.querySelector('#towerB');
const towerC = document.querySelector('#towerC');

// Instantate a variable for the number of discs
let numDiscs = parseInt(dropdown.options[dropdown.selectedIndex].value);
// Instante a variable to track when there is a disc selected
let discSelected = false;
// Create a counter to track the # of moves
let moveCount = 0;
let events = [];
// Create discs using DOM elements
function createDiscs() {
    let dropdown = document.getElementById('dropdown');
    numDiscs = parseInt(dropdown.options[dropdown.selectedIndex].value); // Do I need this second call-out???
    for (let i = 1; i < numDiscs + 1; i++) {
        let discDiv = document.createElement('div');
        discDiv.id = 'disc' + i;
        discDiv.innerText = `${i}`
        discDiv.classList.add('disc');
        towerA.appendChild(discDiv);
        displayMessage('');
    }
}
createDiscs();
minMoves();

// This holds the main logic of the game
let gameplay = function(){
    
    // On first click
    if (discSelected === false) {
        // If clicking an empty tower, return
        if (this.childElementCount === 0) {
            return
        // Otherwise, highlight the top disc
        } else {
            this.firstElementChild.style.borderWidth = '5px';
            // Assign the top disc to the nodeSelected variable
            discSelected = this.firstElementChild;
        }

    // On second click, where discSelected === true
    } else {
        // If you click on the same tower twice, de-select the disc
        if (discSelected === this.firstElementChild) {
            this.firstElementChild.style.borderWidth = '3px';
            discSelected = false;
        
        // If tower is empty, move the disc to the empty tower
        } else if (this.childElementCount === 0) {
            discSelected.style.borderWidth = '3px';
            this.prepend(discSelected);
            discSelected = false;
            moveCount += 1;
            if (moveCount == 1) {
                displayMessage(`${moveCount} move`);
            } else {
                displayMessage(`${moveCount} moves`);
            }
            
        // If selected disc is smaller than the target disc, move the disc
        } else if (discSelected.offsetWidth < this.firstElementChild.offsetWidth) {
            discSelected.style.borderWidth = '3px';
            this.prepend(discSelected);
            discSelected = false;
            moveCount += 1;
            displayMessage(`${moveCount} moves`);
            // Check if the game has been won
            checkWin();

        // If selected disc is larger than the target disc, invalid move
        } else if (discSelected.offsetWidth > this.firstElementChild.offsetWidth) {
            displayMessage('Invalid Move')
        }
    }
}

towerA.addEventListener('click', gameplay);
towerB.addEventListener('click', gameplay);
towerC.addEventListener('click', gameplay);

// Create a function to check if the game as been won
function checkWin() {
    if (towerC.childElementCount === numDiscs) {
        displayMessage(`Congratulations! You won in ${moveCount} moves!`);
    }
}

// Create an event listener for the reset button that resets the game
document.querySelector('.reset-button').addEventListener('click', () => {
    // Clear the existing discs from the board
    document.querySelectorAll('.disc').forEach(disc => disc.remove());
    createDiscs();
    moveCount = 0;
});

// Create a function that resets the game
function newGame() {
    document.querySelectorAll('.disc').forEach(disc => disc.remove());
    createDiscs();
    minMoves();
    moveCount = 0;
}

// Create a function to display a message
function displayMessage(message) {
    const messageToDisplay = document.querySelector('#message');
    messageToDisplay.innerHTML = message.toUpperCase();
}

// Create a function to display minimum moves on selecting a different disc
// The formula is 2 ** n - 1 where n=number of discs
function minMoves() {
    let numDiscs = parseInt(dropdown.options[dropdown.selectedIndex].value);
    let minMoves = document.querySelector('.minimum');
    minMoves.innerHTML = `${2**numDiscs - 1} moves to win`.toUpperCase();
}

// SOLVE LOGIC
// Create an event listener for the solve button that solves the game
document.querySelector('.solve-button').addEventListener('click', () => {
    // Clear the existing discs from teh board
    document.querySelectorAll('.disc').forEach(disc => disc.remove());
    // Reset the move count
    moveCount = 0;
    // Reset the game so it can solve from the beginning
    newGame();
    // Clear the events array
    events = [];
    returnSolvedArr(towerA, towerC, towerB, numDiscs);
    newGame();
    let interval = 500;
    events.forEach(arr => {
        // arr has format [discToMove, end]
        moveDisc(arr[0], arr[1], interval);
        interval += 500;
    })
    displayMessage(`Nothing wrong with getting a little help :)`);
})

// Define a function to move discs to be used in self-solve
// Remove the disc from it's first location, and prepend it to it's target
function moveDisc(discToMove, end, interval) {
    // Add a delay
    setTimeout(() => {
        // Re-query the DOM, grab the disc by its ID to remove it
        document.getElementById(discToMove.id).remove();
        // Add the DOM element to the target tower
        end.prepend(discToMove);
    }, interval);
}

// Define a solve function that returns an array of arrays containing moves to win the game 
// Each move has the format [discToMove, end]
function returnSolvedArr(begin, end, temp, n) {
    // Moving one disc is the base case
    if (n === 1) {
        discToMove = begin.firstElementChild;
        end.prepend(discToMove);
        events.push([discToMove, end]);
    } else {
        // Moving more than one disc is the recursive case 
        // Step 1: Move top (N-1) discs from Beg to Temp tower.
        // Step 2: Move 1 disc from Beg to End tower (in the case of 3 discs, this is the bottom disc)
        // Step 3: Move top (N-1) discs from Temp to End tower (in the case of 3 discs, this is the top 2 discs)   
        returnSolvedArr(begin, temp, end, n-1);
        returnSolvedArr(begin, end, temp, 1);
        returnSolvedArr(temp, end, begin, n-1);
    }
}