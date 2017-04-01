const TETROMINOS = [
    //O
    {
       shape: [
            [1, 1], 
            [1, 1], 
        ],
        position: {row: 0, col: 2},
        nextPosition: {row: 1, col: 2},
    },
    //J
    {
       shape: [
            [0, 1], 
            [0, 1], 
            [1, 1],
        ],
        rotations: [
            [[0,1],
            [0,1],
            [1,1]],
            [[1,0,0],
            [1,1,1]],
            [[1,1],
            [1,0],
            [1,0]],
            [[1,1,1],
            [0,0,1]]
        ],
        position: {row: 0, col: 2},
        nextPosition: {row: 1, col: 2},
    },

    //I
    {
        shape: [
            [0, 1, 0, 0], 
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ],
        rotations: [
            [[0, 0, 0, 0], 
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]],

            [[0, 1, 0, 0], 
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]]
        ],
        position: {row: 0, col: 2},
        nextPosition: {row: 1, col: 2},
    },

    //T
    {
        shape: [
            [1, 1, 1],
            [0, 1, 0],
            [0, 0, 0],
        ],
        rotations: [
            [[0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]],

            [[0, 1, 0],
            [0, 1, 1],
            [0, 1, 0]],

            [[0, 1, 0],
            [1, 1, 0],
            [0, 1, 0]],

            [[1, 1, 1],
            [0, 1, 0],
            [0, 0, 0]],

        ],
        position: {row: 0, col: 2},
        nextPosition: {row: 1, col: 2},
    },

    //S
    {
        shape: [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0],
        ],
        rotations: [
           [[1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]],

           [[1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]],


        ],
        position: {row: 0, col: 2},
        nextPosition: {row: 1, col: 2},
    },



]

function getTetromino() {
     return JSON.parse(JSON.stringify(TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)]));
}