// Instantiate three towers as stacks
// Instantiate 3 (to begin) disks on the first tower, each with different size values
// This input is where we could later adjust # of discs from user input
let numDiscs = 5;
towerA = []
towerB = []
towerC = []
for (let i = 1; i < numDiscs + 1; i++) {
    towerA.push(i);
}
console.log('towerA: ', towerA);
console.log('towerB: ', towerB);
console.log('towerC: ', towerC);

// Instantiate a variable which holds the value of the top of the stack on a tower

// Createa  function to move pieces
    // On first click, if the tower has a disk(s), the highlight the smallest disk
        // If there are no discs on that tower, do nothing
    // On second click, check to see if the move is legal
        // If the move is invalid, show a message on the screen

// Create a function to prompt a move

// Create a function to check if the game as been won

// Step 1: Move top (N-1) disks from Beg to Aux tower.
// Step 2: Move 1 disk from Beg to End tower.
// Step 3: Move top (N-1) disks from Aux to End tower.

// Moving one case is the base case
// Moving more than one case is the recursive case 

function solve(begin, end, temp, n) {
    // Moving one disc is the base case
    if (n === 1) {
        end.push(begin.pop());
    // Moving more than one disc is the recursive case
    } else {
        solve(begin, temp, end, n-1);
        solve(begin, end, temp, 1);
        solve(temp, end, begin, n-1);
    }
}

solve(towerA, towerC, towerB, numDiscs);
console.log('towerA: ', towerA);
console.log('towerB: ', towerB);
console.log('towerC: ', towerC);