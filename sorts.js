/*
 * sorts.js - a variety of sorting algorithms and other functions
 */


// assert - this function will wrap the above assert method and
// remove the need to pass in a string, instead, the expression
// that is given will be used as the message passed into assert.
function assert(expression) {
    assert(expression, '');
}

// assert - this function will add support for assertions. Two items
// can be passed in and their equality will be tested. If they are
// evaluated to be equal, then the function will silently return,
// otherwise an error will be thrown using the message given in the
// second argument.
//
// This function will add support for assertions so that I
// can actually do quick inline testing of my code to see that certain
// properties hold during execution and that the outputs of functions
// are what I expect.
//
// Example:
// assert(4<5, "comparing 4 and 5");
// > undefined
// assert(4>5, "comparing 4 and 5");
// > Error: Assertion Violated: comparing 4 and 5
function assert(expression, message) {
    if(!expression) {
        var errorMessage = '';
        if(message) {
            errorMessage = "Assertion Violated: " + message;
        }
        else {
            errorMessage = "Assertion Violated";
        }

        throw new Error(errorMessage);
    }
}


// getMax - this function will take an array of integers and find
// the max value in that array.
//
// Example:
// getMax([1,2,3])
// > 3
function getMax(arr) {
    // if the array is empty, return undefined
    if(arr.length == 0) {
        return undefined;
    }
    var max = arr[0];
    for(var i = 0; i < arr.length; i++) {
        if(max < arr[i]) {
            max = arr[i];
        }
    }
    
    return max;
}

// getMin - this function will take an array of integers and find
// the min value in that array.
//
// Example:
// getMin([1,2,3])
// > 1
function getMin(arr) {
    // if the array is empty, return undefined
    if(arr.length == 0) {
        return undefined;
    }
    var min = arr[0];
    for(var i = 0; i < arr.length; i++) {
        if(min > arr[i]) {
            min = arr[i];
        }
    }

    return min;
}

// testing out getMax()
assert(getMax([1,2,3]) == 3, "using getMax");
assert(getMax([5,2,4]) == 5, "using getMax");
assert(getMax([-1,-2,-3]) == -1, "using getMax");
assert(getMax([10]) == 10);
assert(getMax([]) == undefined);

// testing out getMin()
assert(getMin([1,2,3]) == 1);
assert(getMin([5,2,4]) == 2);
assert(getMin([-1,-2,-3]) == -3);
assert(getMin([10]) == 10);
assert(getMin([]) == undefined);

