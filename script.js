// Algorithm
// Instantiate a variable for the number of discs
// This input is where we could later adjust # of discs from user input
let numDiscs = 5;
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
const towers = document.querySelector('.towers')
const towerA = document.querySelector('#towerA');
const towerB = document.querySelector('#towerB');
const towerC = document.querySelector('#towerC');

// Instante a variable to track when there is a click
// This will help with the logic of moving pieces
let nodeSelected = false;

// Create discs using DOM elements
function createDiscs() {
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
    // If first click and clicking no disks, return
    if (nodeSelected === false && this.childElementCount === 0) {
        return
    // If you click on the same tower twice, de-select the disc
    } else if (nodeSelected === this.firstElementChild) {
        this.firstElementChild.style.borderWidth = '1px';
        nodeSelected = false;
    }
    // On first click, if the tower has a disc(s), the highlight the smallest disk
        // If there are no discs on that tower, do nothing
    // On second click, check to see if the move is legal
        // If the move is invalid, show a message on the screen
        // If the move is valid, move the disc
}









// Instantiate event listeners on the towers, which delegates to the individual tower
towers.addEventListener('click', (e) => {
    console.log(e.target);
    // If there hasn't been a first click and you click on an empty tower, return
    if (active === false && e.target.childElementCount === 0) {
        return
    // If there hasn't been a first click and you click on a non-empty tower
    } else if (active === false && e.target.childElementCount !== 0) {
        e.target.firstElementChild.style.borderWidth = '10px';
        active = true;
        selectedNode = e.target.firstElementChild
    // If there has been a first click and you click on an empty tower, move the disk
    } else if (selectedNode.offsetWidth < e.target.firstElementChild.offsetWidth || e.target.childElementCount === 0) {
        selectedNode.style.borderWidth = '1px';
        e.target.appendChild(selectedNode);
        active = false;
    }
    // stop delegation to children
    // easier to remove the ability for event to be one of the disks
    // try event listeniners on the individual towers
    // OR stop delegation to the children so it only ever gets tagged to the towers
});

// Stop event propagation to to the discs, so the tower stays selected 
discs = document.querySelectorAll('.disc');
discs.forEach(disc => {
    disc.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// towerA.addEventListener('click', (e) => {
//     e.stopPropagation();
// })


// Create a function to check if the game as been won


// 4/30: Finalize logic for the game
// 5/1: Fine-tune the styling (spacing, colors, font, centering, input)
// 5/3: Complete the self-solve functionality
// Time-Allowing: Add move-counter