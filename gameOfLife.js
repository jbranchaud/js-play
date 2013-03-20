var BOARD_SIZE = 100;

function board() {
    this.board = createBoard(BOARD_SIZE);
}

/*
 * createBoard: Integer:boardSize -> Array<Array<Integer>>:board
 * given the size of a board, this function creates a 2d array for
 * the board that is boardSize x boardSize with all the values
 * initialized to 0. The resulting 2D array is then returned.
 */
function createBoard(boardSize) {
    if(boardSize == null) {
        boardSize = BOARD_SIZE;
    }
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

/*
 * printBoard: Array<Array<Integer>:board -> void
 * given a 2D array of integers that represents a Game of Life game
 * board, this function will pretty print the board to the console
 * for everyone's viewing pleasure.
 */
function printBoard(board) {
    function printRow(element, index, array) {
        console.log(element.join(''));
    }
    board.forEach(printRow);
}

var b1 = createBoard();
var b2 = createBoard(20);
printBoard(b2);
