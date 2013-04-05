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

// wrap the function in a closure
var firstModule = ( function() {
    
    var values = [1,2,3,4,5];

    function privateFunction() {
        for(var i = 0; i < values.length; i++) {
            console.log(values[i]);
        }
    }

    return {
        publicFunction: function() {
            privateFunction();
        }
    };
})();

var myValues = [1,2,3,4,5];

var secondModule = ( function(values) {
    
    function privateFunction() {
        for(var i = 0; i < values.length; i++) {
            console.log(values[i]);
        }
    }

    return {
        publicFunction: function() {
            privateFunction();
        }
    }
})(myValues);
