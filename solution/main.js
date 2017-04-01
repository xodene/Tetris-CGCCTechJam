(function() {
"use strict";
    const GAME_WINDOW_WIDTH = 520;
    const GAME_WINDOW_HEIGHT = 520;
    const GRID_ROWS = 16;
    const GRID_COLUMNS = 10;
    const TILE_SIZE = 32;
    const GRID_WIDTH = GRID_COLUMNS*TILE_SIZE;
    const GRID_HEIGHT = GRID_ROWS*TILE_SIZE;
    const SCREEN_SHAKE_TIME = 500;
    const SCREEN_SHAKE_POWER = 8;

    let screenShakeStartTime = -1;
    let blockImages = [];

    let context = null;
    let restingBlocks = null;
    let linesMade = 0;
    let tetromino = null;
    let nextTetromino = colorTetromino(getTetromino(), Math.floor(1+Math.random()*6));
    let gameOver = false;


    window.restingBlocks = restingBlocks;
    window.nextTetromino = nextTetromino;

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

    function gameLoop() {
        if(!gameOver) {
            if(tetromino)
                update();
        }
    }

    function render() {
        context.clearRect(0, 0, GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT);
        context.strokeRect(0, 0, GRID_WIDTH, GRID_HEIGHT);
        screenShake();
        drawRestingBlocks();
        drawTetromino();
        endScreenShake();

        drawGui();
        if(gameOver) {
            gui.drawLabel(context, "GAME OVER", (GRID_WIDTH/2), GRID_HEIGHT/2);
            startScreenShake();
        }
        //calls our render function every 16 milliseconds
        requestAnimationFrame(render);
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

    function update() {
        let shape = tetromino.shape;
        for(let row = 0; row < shape.length; row++) {
            for(let col = 0; col < shape[row].length; col++) {
                if(shape[row][col] != 0) {
                   //hits ground
                   if(row + tetromino.nextPosition.row >= GRID_ROWS-1) {
                        restTetromino(tetromino);
                        spawnTetromino();
                        return;
                   }
                   //tetromino hits a landed block
                   if(restingBlocks[row + (tetromino.nextPosition.row+1)][col + tetromino.nextPosition.col] != 0) {
                        //we've reached the top!
                        if(tetromino.position.row === 0) {
                            gameOver = true;
                        }
                        restTetromino(tetromino);
                        spawnTetromino();
                        return;
                   }

                }
            }
        }

        lineMade();

        tetromino.position.row++;
        tetromino.position = tetromino.nextPosition;
    }
    function screenShake() {
        let timeDifference = Date.now() - screenShakeStartTime;
        if(timeDifference > SCREEN_SHAKE_TIME) {
            screenShakeStartTime = -1;
            return;
        }
        context.save();
        let shakeLeft = Math.random() * SCREEN_SHAKE_POWER;
        let shakeUp = Math.random() * SCREEN_SHAKE_POWER;
        context.translate(shakeLeft, shakeUp);
    }

    function startScreenShake() {
        screenShakeStartTime = Date.now();
    }

    function endScreenShake() {
        context.restore();
    }


    function drawGui() {
        gui.nextTetromino(context, blockImages, nextTetromino.shape, GRID_WIDTH+64, 100);
        gui.drawLabel(context, "Lines: " + linesMade, GRID_WIDTH+64, GRID_HEIGHT/2);
      
    }

    function spawnTetromino() {
        tetromino = nextTetromino;
        tetromino.position = {row: 0, col: 2};
        tetromino.nextPosition =  {row: 1, col: 2},
        nextTetromino = colorTetromino(getTetromino(), Math.floor(1+Math.random()*6));
    }

    function colorTetromino(tetromino, color) {
        function colorShape(shape) {
            for(let row = 0; row < shape.length; row++) {
                for(let col = 0; col < shape[row].length; col++) {
                    if(shape[row][col] != 0) {
                        shape[row][col] = color;
                    }
                }
            }
        }

        colorShape(tetromino.shape);
        if(tetromino.rotations) {
            for(let i = 0; i < tetromino.rotations.length; i++) {
                let rotationShape = tetromino.rotations[i];
                colorShape(rotationShape);
            }
        }

        return tetromino;
    }


    function moveTetromino(nextCol) {
        let shape = tetromino.shape;
        //vaildate this move
        for(let row = 0; row < shape.length; row++) {
            for(let col = 0; col < shape[row].length; col++) {
                if(shape[row][col] != 0) {
                   //tetromino hits the left wall OR hits the right wall
                    if(col + (tetromino.nextPosition.col+nextCol) < 0 ||
                       col + (tetromino.nextPosition.col+nextCol) > GRID_COLUMNS-1)  {
                       return; //don't move
                   }                   
                   //the next move will hit a block
                   if(restingBlocks[row + tetromino.nextPosition.row][col + tetromino.nextPosition.col+nextCol] != 0) {
                        return;
                   }

                }
            }
        }
        tetromino.nextPosition.col += nextCol;
    }

    function rotateTetromino() {
        if(tetromino.rotations) {
            let rotationIndex = tetromino.rotations.indexOf(tetromino.shape);
            if(rotationIndex < tetromino.rotations.length-1) {
                rotationIndex++;
            }
            else {
                rotationIndex = 0;
            }
            let nextShape = tetromino.rotations[rotationIndex];
            //verify rotation
            for(let row = 0; row < nextShape.length; row++) {
                for(let col = 0; col < nextShape[row].length; col++) {
                    if(nextShape[row][col] != 0) {
                        //wall kick
                       if(col + (tetromino.nextPosition.col) < 0) {
                           moveTetromino(1);
                       }
                       if(col + tetromino.nextPosition.col > GRID_COLUMNS-1) {
                           moveTetromino(-1);
                       }
                       
                       //don't rotate into a resting block
                       if(restingBlocks[row + tetromino.nextPosition.row][col + tetromino.nextPosition.col] != 0) {
                            return;
                        }
                      
                    }
                }
            }

            tetromino.shape = nextShape;
        }
    }

    function lineMade() {
        for(let row = 0; row < restingBlocks.length; row++) {
            let firstBlock = restingBlocks[row][0];
            let foundLine = true;
            if(firstBlock === 0) continue;
            for(let col = 0; col < restingBlocks[row].length; col++) {
                if(firstBlock !== restingBlocks[row][col]) {
                    foundLine = false;
                    break;
                }
            }
            if(foundLine) {
                clearRow(row);
                startScreenShake();
                linesMade++;
                return;
            }
        }
    }

    function clearRow(rowIndex) {
        //remove the row from our array
        restingBlocks.splice(rowIndex, 1);
        //prepend an empty row to our array, effectively pushing every block down one row
        restingBlocks.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }


    window.addEventListener("keydown", function(event) {
        const UP_ARROW = 38;
        const DOWN_ARROW = 36;
        const LEFT_ARROW = 37;
        const RIGHT_ARROW = 39;

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