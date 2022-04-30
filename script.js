// Algorithm
// Instantiate a variable for the number of discs
// This input is where we could later adjust # of discs from user input
let numDiscs = 3;
// Instantiate three towers as stacks
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
// Step 1: Move top (N-1) discs from Beg to Temp tower.
// Step 2: Move 1 disc from Beg to End tower (in the case of 3 discs, this is the bottom disc)
// Step 3: Move top (N-1) discs from Temp to End tower (in the case of 3 disks, this is the top 2 discs)
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Instantiate the three towers by grabbing the corresponding IDs in the DOM
// const towers = document.querySelector('.towers')
const towerA = document.querySelector('#towerA');
const towerB = document.querySelector('#towerB');
const towerC = document.querySelector('#towerC');

// Instante a variable to track when there is a click
// This will help with the logic of moving pieces
let discSelected = false;

// Create discs using DOM elements
function createDiscs() {
    let dropdown = document.getElementById('dropdown');
    let numDiscs = parseInt(dropdown.options[dropdown.selectedIndex].value);
    for (let i = 1; i < numDiscs + 1; i++) {
        let discDiv = document.createElement('div');
        discDiv.id = 'disc' + i;
        discDiv.innerText = `${i}`
        discDiv.classList.add('disc');
        towerA.appendChild(discDiv);
        console.log(`discDiv${i}'s offsetWidth:${discDiv.offsetWidth}`);
    }
}
createDiscs();

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
            
        // If selected disc is smaller than the target disc, move the disc
        } else if (discSelected.offsetWidth < this.firstElementChild.offsetWidth) {
            discSelected.style.borderWidth = '3px';
            this.prepend(discSelected);
            discSelected = false;
            // Check if the game has been won
            checkWin();

        // If selected disc is larger than the target disc, invalid move
        } else if (discSelected.offsetWidth > this.firstElementChild.offsetWidth) {
            console.log('Invalid Move.')
        }
    }
}

towerA.addEventListener('click', gameplay);
towerB.addEventListener('click', gameplay);
towerC.addEventListener('click', gameplay);

// Create a function to check if the game as been won
function checkWin() {
    if (towerC.childElementCount === numDiscs) {
        console.log('You won!')
    }
}

// Create an event listener for the reset button that resets the game
document.querySelector('.reset').addEventListener('click', () => {
    // Clear the existing discs from the board
    document.querySelectorAll('.disc').forEach(disc => disc.remove());
    createDiscs();
});

// Create a function that resets the game
function newGame() {
    document.querySelectorAll('.disc').forEach(disc => disc.remove());
    createDiscs();
}

// 4/30: Finalize logic for the game
// 5/1: Fine-tune the styling (spacing, colors, font, centering, input)
// 5/3: Complete the self-solve functionality
// Time-Allowing: Add move-counter


////////// METHOD B
// // Instantiate event listeners on the towers, which delegates to the individual tower
// towers.addEventListener('click', (e) => {
//     console.log(e.target);
//     // If there hasn't been a first click and you click on an empty tower, return
//     if (active === false && e.target.childElementCount === 0) {
//         return
//     // If there hasn't been a first click and you click on a non-empty tower
//     } else if (active === false && e.target.childElementCount !== 0) {
//         e.target.firstElementChild.style.borderWidth = '10px';
//         active = true;
//         selectedNode = e.target.firstElementChild
//     // If there has been a first click and you click on an empty tower, move the disk
//     } else if (selectedNode.offsetWidth < e.target.firstElementChild.offsetWidth || e.target.childElementCount === 0) {
//         selectedNode.style.borderWidth = '1px';
//         e.target.appendChild(selectedNode);
//         active = false;
//     }
//     // stop delegation to children
//     // easier to remove the ability for event to be one of the disks
//     // try event listeniners on the individual towers
//     // OR stop delegation to the children so it only ever gets tagged to the towers
// });
// // Stop event propagation to to the discs, so the tower stays selected 
// discs = document.querySelectorAll('.disc');
// discs.forEach(disc => {
//     disc.addEventListener('click', (e) => {
//         e.stopPropagation();
//     });
// });
// // towerA.addEventListener('click', (e) => {
// //     e.stopPropagation();
// // })