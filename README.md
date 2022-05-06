## Tower of Hanoi
Tower of Hanoi is a mathematical puzzle game consisting of three towers and a number of discs of various widths. The game begins with the discs stacked by decreasing size on a single tower, the smallest at the top. The objective is to move all the discs to the third tower, so that they are stacked in the same order. There are three rules:

1. Only one disc can be moved at a time
2. Every move involves taking the top disc from one of the towers and placing it on top of another tower
3. No disc can be put on top of a smaller disc

In my app, users can play Tower of Hanoi, reset the game, and select anywhere between 3 and 8 discs with which to play. Once you select a number of discs from the dropdown, the screen will display the minimum number of moves needed to win. If users get stuck, they can click the 'Solve' button and the app will solve the game for you.

### Screenshots
![1_open](./assets/1_open.png)
![2_selected](./assets/2_selected.png)
![3_move](./assets/3_move.png)
![4_invalid_move](./assets/4_invalid_move.png)
![5_win](./assets/5_win.png)

### Technologies
* JavaScript
* HTML
* CSS

### Installation Instructions
Follow [this link](https://google.com) to play the game in your browser.

### User Stories
- As a player, I want to be able to select discs and move them around so I can play the game.
- As a player, I want the game to prevent me from making invalid moves so I don't break the rules.
- As a player, I want the game to track the number of moves so I can see my game stats.
- As a player, I'd like to be able to restart the game so I can keep practicing my skills.
- As a player, I'd like to be notified when I win so I can celebrate.
- As a player, I'd like to control the number of discs so I can control the difficulty.
- As a player, I want the game to self-solve so I can see how it's done if I can't figure it out.

### Original Wireframes
![hanoi1](./assets/wireframes/hanoi1.png)
![hanoi2](./assets/wireframes/hanoi2.png)
![hanoi3](./assets/wireframes/hanoi3.png)
![hanoi4](./assets/wireframes/hanoi4.png)

### Unsolved Problems / Major Hurdles
The 'Solve' button functionality was a notable hurdle in developing this app. The recursive algorithm to solve it came pretty quickly, but the task of slowing down each disc movement as the app solved the game was very challenging. When I initially tried to apply setTimeout() to the base case in the recursion, the app solved the game out of order, or returned null nodes in some instances. It turned out that while the algorithm was runnign properly in the background and I was using similar logic as in my main game flow to update the DOM elements, the DOM was not in sync with the algorithm's steps. The solution was to save the winning steps in an array of arrays using the format `[discToMove, end]`. I then iterated through the array using setTimeout and a time delay so the user could view the steps.