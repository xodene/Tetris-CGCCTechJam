(function() {
"use strict";
    const GAME_WINDOW_WIDTH = 520;
    const GAME_WINDOW_HEIGHT = 520;
    const GRID_ROWS = 16;
    const GRID_COLUMNS = 10;
    const TILE_SIZE = 32;
    const GRID_WIDTH = GRID_COLUMNS*TILE_SIZE;
    const GRID_HEIGHT = GRID_ROWS*TILE_SIZE;

    let blockImages = [];

    let context = null;
    let restingBlocks = null;
    let linesMade = 0;
    let tetromino = null;
    let nextTetromino = getTetromino();
    let gameOver = false;

    function start() {
        //adds our "drawing canvas" to the webpage
        loadSprites();
        let canvas = document.createElement("canvas");
        canvas.width = GAME_WINDOW_WIDTH;
        canvas.height = GAME_WINDOW_HEIGHT;
        document.body.appendChild(canvas);
        //grabs the 2d drawing context from our canvas
        context = canvas.getContext("2d");
        initGame();
        render();
        setInterval(gameLoop, 500);
    } 

    function initGame() {
        restingBlocks = getDefaultGrid();
        spawnTetromino();
    }

    function render() {
        context.clearRect(0, 0, GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT);
        context.strokeRect(0, 0, GRID_WIDTH, GRID_HEIGHT);
        drawRestingBlocks();
        drawTetromino();
        //calls our render function every 16 milliseconds
        requestAnimationFrame(render);
    }

    function gameLoop() {
        if(!gameOver) {
            if(tetromino)
                update();
        }
    }

    function getDefaultGrid() {
        let result = [];
        for(let row = 0; row < GRID_ROWS; row++) {
            result[row] = [];
            for(let col = 0; col < GRID_COLUMNS; col++) {
                result[row][col] = 0;

            }
        }
        return result;
    }

    function loadSprites() {
        for(let i = 1; i <= 7; i++) {
            let imageName = "block_" + i + ".png";
            let img = new Image();
            img.src = imageName;
            blockImages.push(img);
        }
    }

    function drawTetromino() {
        if(!tetromino)
            return;
        let shape = tetromino.shape;
        for(let row = 0; row < shape.length; row++) {
            for(let col = 0; col < shape[row].length; col++) {
                let block = shape[row][col];
                if(block != 0) {
                    context.drawImage(
                        blockImages[block], (tetromino.position.col+col) * TILE_SIZE, 
                        (tetromino.position.row + row) * TILE_SIZE
                    );
                }
           }
        }
    }

    function update() {
        let shape = tetromino.shape;

        /*
        * 
        * Hey, start here!
        * We need to make the tetromino fall down!
        *
        *
        */

    }


    function drawRestingBlocks() {
        for(let row = 0; row < restingBlocks.length; row++) {
            for(let col = 0; col < restingBlocks[row].length; col++) {
                let block = restingBlocks[row][col];
                if(block != 0) {
                     context.drawImage(
                        blockImages[block], col * TILE_SIZE, 
                         row * TILE_SIZE
                    );
                }
                else {
                    context.clearRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
            }
        }
    }

    function restTetromino(tetromino) {
       let shape = tetromino.shape;
        for(let row = 0; row < shape.length; row++) {
            for(let col = 0; col < shape[row].length; col++) {
                if(shape[row][col] != 0) {
                    restingBlocks[row + tetromino.position.row][col + tetromino.position.col] = shape[row][col];
                }
            }
        }

    }

    function spawnTetromino() {
        tetromino = nextTetromino;
        tetromino.position = {row: 0, col: 2};
        tetromino.nextPosition =  {row: 1, col: 2};
        nextTetromino = getTetromino();
    }

    /*
        Colors the given tetromino with the given color, as well as its potentinal rotations.
    */
    function colorTetromino(tetromino, color) {
        //to be implemented
    }

    /*
        Moves the current tetromino to the next column (nextCol) if it is in a vaild position
    */
    function moveTetromino(nextCol) {
         //to be implemented
    }

    /*
        Rotates the current tetromino if it is in a vaild position
    */
    function rotateTetromino() {
        //to be implemented
    }

    /* Checks if any of the landed blocks make a line
    */
    function lineMade() {
        //to be implemented
    }

    /* Clears an entire row blocks, given the rowIndex.
    */
    function clearRow(rowIndex) {
        //to be implemented
    }

    window.addEventListener("keydown", function(event) {
        const UP_ARROW = 38;
        const DOWN_ARROW = 36;
        const LEFT_ARROW = 37;
        const RIGHT_ARROW = 39;
        console.log("KEYDOWN")
        if(event.keyCode == RIGHT_ARROW) {
            moveTetromino(1);
        }
        else if(event.keyCode === UP_ARROW) {
            rotateTetromino();
        }
        else if(event.keyCode === LEFT_ARROW) {
             moveTetromino(-1);
        }
    });

    window.addEventListener("load", start);

})();