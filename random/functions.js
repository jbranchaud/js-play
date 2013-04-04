/*
 * functions.js
 * 
 * I am going to experiment a little with functions in this file.
 *
 * Great article from MDN that goes into depth about this:
 * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Functions_and_function_scope#Function_constructor_vs._function_declaration_vs._function_expression
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
