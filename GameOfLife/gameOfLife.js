var BOARD_SIZE = 100,
    DEAD = 0,
    ALIVE = 1,
    RECT_WIDTH = 10,
    RECT_HEIGHT = 10,
    RECT_PADDING = 2,
    XOFFSET = 20,
    YOFFSET = 20;

/*
 * an object that represents a Game of Life board
 */
function Board(board) {
    // check if a board was given or if one needs creating
    this.board = board;
    if(board == null) {
        this.board = createBoard(BOARD_SIZE);
    }

    // make sure the board is at least a rectangle
    if(!validateBoard(this.board)) {
        throw new Error("Invalid Board");
    }

    // initialize the Board attributes
    this.paused = false;
    this.boardHeight = board.length;
    this.boardWidth = board[0].length;
    this.rectWidth = RECT_WIDTH;
    this.rectHeight = RECT_HEIGHT;
    this.rectPadding = RECT_PADDING;
    this.xOffset = XOFFSET;
    this.yOffset = YOFFSET;
    this.svgWidth =
        (this.boardWidth * (this.rectWidth + this.rectPadding)) - this.rectPadding + (this.xOffset * 2);
    this.svgHeight =
        (this.boardHeight * (this.rectHeight + this.rectPadding)) - this.rectPadding + (this.yOffset * 2);
}

// add a function to the Board prototype that will build a data array
Board.prototype.getDataArray = function() {
    var data = [];
    for(var i = 0; i < this.board.length; i++) {
        for(var j = 0; j < this.board[i].length; j++) {
            data.push([j,i,this.board[i][j]]);
        }
    }
    return data;
};

// add a function to the Board prototype that will generate the SVG
Board.prototype.generateSVG = function() {
    var self = this;
    // create the correctly sized SVG element and append it to the page body
    this.svg = d3.select("body").append("svg")
                .attr("width", this.svgWidth)
                .attr("height", this.svgHeight);

    // append a bunch of g tags to the svg based on the data array for this
    // board
    this.gEnters = this.svg.selectAll("g")
        .data(this.getDataArray())
        .enter()
        .append("g");

    // append, position, and fill a rectangle for each g tag based on the
    // data for that tag
    this.gEnters.append("rect")
        .attr("x", function(d,i) {
            return (d[0] * (self.rectWidth + self.rectPadding)) + self.xOffset;
        })
        .attr("y", function(d,i) {
            return (d[1] * (self.rectHeight + self.rectPadding)) + self.yOffset;
        })
        .attr("width", this.rectWidth)
        .attr("height", this.rectHeight)
        .attr("fill", function(d,i) {
            if(d[2] <= 0) {
                return "lightgray";
            }
            else {
                return "black";
            }
        });
}

// add a function to the Board prototype that will update the board
Board.prototype.update = function() {
    this.board = updateBoard(this.board);
}

// add a function to the Board prototype that will update the SVG
Board.prototype.updateSVG = function() {
    var self = this;
    this.gEnters.selectAll("rect")
        .attr("fill", function(d,i) {
            if(self.board[d[1]][d[0]] <= 0) {
                return "lightgray";
            }
            else {
                return "black";
            }
        });
}

// add a function to the Board prototype that will pause the board (that
// is, set the board's paused value to true).
Board.prototype.pause = function() {
    this.paused = true;
}

// add a function to the Board prototype that will unpause the board (that
// is, set the board's paused value to false).
Board.prototype.unpause = function() {
    this.paused = false;
}

// add a function to Board prototype that will run the board
Board.prototype.run = function(interval, paused) {
    // do the initial rendering of the board
    this.generateSVG();

    // if interval is not specified, then initialize it to a default value
    // of 1000
    if(interval == null) {
        interval = 1000;
    }

    // if paused is not specified, then assume false
    if(paused == null) {
        this.unpause();
    }

    // set the interval for the given interval value
    var self = this;
    setInterval(function() {
        if(self.paused) {
            return;
        }
        self.update();
        self.updateSVG();
    }, interval);
}

/*
 * pauseToggle: Board:board -> boolean:toggled
 * given a Board object, this function will attempt to toggle the paused
 * value of this board using either the pause() or unpause() functions.
 */
function pauseToggle(board) {
    // if the board is paused, then unpause
    if(board.paused) {
        board.unpause();
    }
    // otherwise, pause the board
    else {
        board.pause();
    }
    return true;
}

/*
 * createBoard: Integer:boardWidth, Integer:boardHeight ->
 *  Array<Array<Integer>>:board
 * given the width and height of the board, this function creates a 2D array
 * for the board that is boardWidth x boardHeight with all the values
 * initialized to 0. If only a single Integer value is given, then this
 * function creates a 2D array for the board that is boardWidth x boardWidth
 * (that is, a square) with all the values initialized to 0. The resulting
 * 2D array is then returned.
 */
function createBoard(boardWidth, boardHeight) {
    // if the boardWidth isn't given, then use the default board size
    if(boardWidth == null) {
        boardWidth = BOARD_SIZE;
    }

    // if the boardHeight isn't given, then use whatever value is stored in
    // the boardWidth, thus making this a square board.
    if(boardHeight == null) {
        boardHeight = boardWidth;
    }

    var board = new Array(boardHeight);
    for(var i = 0; i < boardHeight; i++) {
        var currRow = new Array(boardWidth);
        for(var j = 0; j < boardWidth; j++) {
            currRow[j] = 0;
        }
        board[i] = currRow;
    }
    return board;
}

/*
 * createRandomBoard: Integer:boardWidth, Integer:boardHeight ->
 *  Array<Array<Integer>>:board
 * given the width and height of a board, this function creates a 2D array
 * for the board that is boardWidth x boardHeight with all the values
 * randomly initialized to either 0 or 1. Given only a value for the width,
 * this function creates a 2D array for the board that is boardWidth x
 * boardWidth, again with all the values randomly initialized. If no values
 * are given, then the default board size is used for the width and the
 * height. The resulting 2D array is then returned.
 */
function createRandomBoard(boardWidth, boardHeight) {
    // if no width value is given, then use the default board size
    if(boardWidth == null) {
        boardWidth == BOARD_SIZE;
    }

    // if no height value is given, then use the width
    if(boardHeight == null) {
        boardHeight = boardWidth;
    }

    // create a random board with size boardWidth x boardHeight
    var board = new Array(boardHeight);
    for(var i = 0; i < boardHeight; i++) {
        var currRow = new Array(boardWidth);
        for(var j = 0; j < boardWidth; j++) {
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
    var updatedBoard = [];
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

