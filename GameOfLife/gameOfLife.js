var BOARD_SIZE = 100,
    DEAD = 0,
    ALIVE = 1,
    RECT_WIDTH = 10,
    RECT_HEIGHT = 10,
    RECT_PADDING = 2,
    XOFFSET = 20,
    YOFFSET = 20;

function Board(board) {
    if(board == null) {
        this.board = createBoard(BOARD_SIZE);
    }
    else {
        this.board = board;
    }
    // make sure the board is at least a rectangle
    if(!validateBoard(this.board)) {
        throw new Error("Invalid Board");
    }
    this.boardHeight = board.length;
    this.boardWidth = board[0].length;
    this.svgWidth =
        (this.boardWidth * (RECT_WIDTH + RECT_PADDING)) - RECT_PADDING + (XOFFSET * 2);
    this.svgHeight =
        (this.boardHeight * (RECT_HEIGHT + RECT_PADDING)) - RECT_PADDING + (YOFFSET * 2);
    this.svg = d3.select("body").append("svg")
                .attr("width", this.svgWidth)
                .attr("height", this.svgHeight);

}

// add a function to the Board prototype that will build a data array
Board.prototype.getDataArray = function() {
    var data = [];
    for(var i = 0; i < this.board.length; i++) {
        for(var j = 0; j < this.board[i].length; j++) {
            data.push([i,j,this.board[i][j]]);
        }
    }
    return data;
};

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
 * createRandomBoard: Integer:boardSize -> Array<Array<Integer>>:board
 * given the size of a board, this function creates a 2d array for the
 * board that is boardSize x boardSize with all the values randomly
 * initialized to either 0 or 1. The resulting 2D array is then returned.
 */
function createRandomBoard(boardSize) {
    if(boardSize == null) {
        boardSize = BOARD_SIZE;
    }
    var board = new Array(boardSize);
    for(var i = 0; i < boardSize; i++) {
        var currRow = new Array(boardSize);
        for(var j = 0; j < boardSize; j++) {
            currRow[j] = Math.floor(Math.random() * 10) % 2;
        }
        board[i] = currRow;
    }
    return board;
}

/*
 * validateBoard: Array<Array<Integer>>:board -> boolean:valid
 * given a 2D array of integers that represents a board, this function will
 * check that it meets the criteria for a valid Game of Life board.
 * The criteria for a valid board is as follows:
 * - we aren't forcing square, so width and height can differ
 * - the width and height must both be greater than 0
 * - each row needs to be the same length
 */
function validateBoard(board) {
    if(board.length <= 0) {
        return false;
    }

    var width = board[0].length;
    if(width <= 0) {
        return false;
    }
    for(var i = 1; i < board.length; i++) {
        if(board[i].length != width) {
            return false;
        }
    }

    return true;
}

/*
 * updateBoard: Array<Array<Integer>>:board -> Array<Array<Integer>>:board
 * given a board, this function will update the board according to the
 * rules of the game of life. The rules of the game of life are as follows:
 * - Any live cell with fewer than two live neighbours dies, as if caused by
 *   under-population
 * - Any live cell with two or three live neighbours lives on to the next
 *   generation
 * - Any live cell with more than three live neighbours dies, as if by
 *   overcrowding
 * - Any dead cell with exactly three live neighbours becomes a live cell,
 *   as if by reproduction
 */
function updateBoard(board) {
    updatedBoard = [];
    for(var i = 0; i < board.length; i++) {
        var row = board[i],
            updatedRow = [];
        for(var j = 0; j < row.length; j++) {
            var count = countLiveNeighbors(board, i, j),
                alive = (isLive(board,i,j) != DEAD);
            if(alive && count < 2) {
                updatedRow.push(DEAD);
            }
            else if(alive && count >= 2 && count <= 3) {
                updatedRow.push(ALIVE);
            }
            else if(alive && count > 3) {
                updatedRow.push(DEAD);
            }
            else if(!alive && count == 3) {
                updatedRow.push(ALIVE);
            }
            else {
                updatedRow.push(DEAD);
            }
        }
        updatedBoard.push(updatedRow);
    }
    return updatedBoard;
}

/*
 * getLivenessBoard:
 *  Array<Array<Integer>>:board -> Array<Array<Integer>>:lboard
 * this function will go through a given board and build a new board
 * that represents the liveness of the board. The new board will have
 * a value at each cell that represents the number of live neighbors
 * that the cell has.
 */
function getLivenessBoard(board) {
    var lboard = [];
    for(var i = 0; i < board.length; i++) {
        var row = board[i],
            lrow = [];
        for(var j = 0; j < row.length; j++) {
            lrow.push(countLiveNeighbors(board,i,j));
        }
        lboard.push(lrow);
    }
    return lboard;
}

/*
 * isLive: Array<Array<Integer>>:board, Integer:x, Integer:y -> Integer:val
 * given a board and the a coordinate on the board, this function will see
 * if the position specified by the coordinate is live or dead. If it is
 * live, then it will return a positive value (probably 1) otherwise it will
 * return 0.
 */
function isLive(board, x, y) {
    var row = board[x];
    if(row != undefined) {
        var val = row[y];
        if(val != undefined) {
            return val;
        }
    }
    return 0;
}

/*
 * countLiveNeighbors:
 *  Array<Array<Integer>>:board Integer:x Integer:y -> Integer:count
 * given a board, this function will look at the locations surrounding
 * the cell located at the coordinate (x,y). For each live cell around
 * that cell, the count will be incremented. The final count will be
 * returned. This function uses the isLive function to remove the need
 * to do bounds checking on every possible neighbor.
 */
function countLiveNeighbors(board,x,y) {
    var count = 0;
    count += isLive(board, x-1, y);
    count += isLive(board, x+1, y);
    count += isLive(board, x-1, y-1);
    count += isLive(board, x+1, y-1);
    count += isLive(board, x-1, y+1);
    count += isLive(board, x+1, y+1);
    count += isLive(board, x, y-1);
    count += isLive(board, x, y+1);
    return count;
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
