/*
 * functions.js
 * 
 * I am going to experiment a little with functions in this file.
 */

// normal function construction
function getMax(a, b) {
    if(a > b) {
        return a;
    }
    else {
        return b;
    }
}

// assign anonymous function to var
var getMin = function(a, b) {
    if(a < b) {
        return a;
    }
    else {
        return b;
    }
};

var abs = function absolute(a) {
    if(a >= 0) {
        return a;
    }

    return (a * -1);
};
