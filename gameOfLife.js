var BOARD_SIZE = 100;

function board() {
    this.board = createBoard(BOARD_SIZE);
}

/*
 * createBoard: none -> Array<Array<Integer>>:board
 * this function takes no arguments and instead references the global
 * default BOARD_SIZE. It calls the createBoard function with this
 * BOARD_SIZE value and returns the board that it generates.
 */
function createBoard() {
    console.log('createBoard1 being called.');
    console.log('BOARD_SIZE == ' + BOARD_SIZE);
    return createBoard(BOARD_SIZE);
}

/*
 * createBoard: Integer:boardSize -> Array<Array<Integer>>:board
 * given the size of a board, this function creates a 2d array for
 * the board that is boardSize x boardSize with all the values
 * initialized to 0. The resulting 2D array is then returned.
 */
function createBoard(boardSize) {
    console.log('createBoard2 being called.');
    console.log('BOARD_SIZE == ' + BOARD_SIZE);
    var board = new Array(boardSize);
    for(var i = 0; i < boardSize; i++) {
        var currRow = new Array(boardSize);
        for(var j = 0; j < boardSize; j++) {
            currRow[j] = 0;
        }
        board[i] = currRow;
    }
    return board;
}

createBoard();
createBoard(100);
