// Algorithm
// This script is to track the algorithm only
// This solves hanoi using a stack
// You can view each step of the solve in the console

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

counter = 0

// Solve Hanoi
function solve(begin, end, temp, n) {
    // Moving one disc is the base case
    if (n === 1) {
        // Console.log() each step 
        console.log('tower_A: ', tower_A)
        console.log('tower_B: ', tower_B)
        console.log('tower_C: ', tower_C)
        end.push(begin.pop());
        counter += 1
        console.log(`Step ${counter}`)

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