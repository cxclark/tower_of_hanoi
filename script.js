// Instantiate three towers as stacks
// Instantiate 3 (to begin) disks on the first tower, each with different size values
// This input is where we could later adjust # of discs from user input
let numDiscs = 5;

let tower_A = []
let tower_B = []
let tower_C = []
for (let i = 1; i < numDiscs + 1; i++) {
    tower_A.push(i);
}
console.log('tower_A: ', tower_A);
console.log('tower_B: ', tower_B);
console.log('tower_C: ', tower_C);
// Solve Hanoi
// Moving one case is the base case
// Moving more than one case is the recursive case 
// Step 1: Move top (N-1) disks from Beg to Temp tower.
// Step 2: Move 1 disk from Beg to End tower.
// Step 3: Move top (N-1) disks from Temp to End tower.

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

solve(tower_A, tower_C, tower_B, numDiscs);
console.log('tower_A: ', tower_A);
console.log('tower_B: ', tower_B);
console.log('tower_C: ', tower_C);

// Instantiate the three towers by grabbing the corresponding IDs in the DOM
const towerA = document.querySelector('#towerA');
const towerB = document.querySelector('#towerB');
const towerC = document.querySelector('#towerC');

// Create disc using DOM elements
function createDiscs() {
    for (let i = 1; i < numDiscs + 1; i++) {
        let discDiv = document.createElement('div');
        discDiv.id = 'disc' + i;
        discDiv.classList.add('disc');
        towerA.appendChild(discDiv);
    }
}
createDiscs();


// Instantiate a variable which holds the value of the top of the stack on a tower

// Createa  function to move pieces
    // On first click, if the tower has a disk(s), the highlight the smallest disk
        // If there are no discs on that tower, do nothing
    // On second click, check to see if the move is legal
        // If the move is invalid, show a message on the screen

// Create a function to prompt a move

// Create a function to check if the game as been won

