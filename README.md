# Tetris-CGCCTechJam
Tetris clone made during CGCC Tech Slam Workshop #4 - faciliated by Maximillian Polhill

#Getting Started
Students began with the code in the folder **"starter"**. The **"solution"** folder contains the completed Tetris game. 

To get started, open **starter/main.js** and implement the functions as indicated by the comments. If you get stuck, you can review the solution code and compare it to yours.


## JavaScript Files
### main.js
This is the core of the tetris game and where you'll make your modifications. Comments are present to guide you towards what should be implemented. 

### tetrominos.js
This files contains the shapes and rotations of all tetrominos. It also exposes the function `getTetromino()` which returns a random tetromino shape. 

### gui.js
This is a simple object that handles GUI drawing. All the functions in this object need to be calling in the `render()` function in main.js.
