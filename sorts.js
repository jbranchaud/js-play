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
console.log("Tests for getMax():");
console.log(getMax([1,2,3]) + " == 3");
console.log(getMax([5,2,4]) + " == 5");
console.log(getMax([-1,-2,-3]) + " == -1");
console.log(getMax([10]) + " == 10");
console.log(getMax([]) + " == undefined");

// testing out getMin()
console.log("Tests for getMin():");
console.log(getMin([1,2,3]) + " == 1");
console.log(getMin([5,2,4]) + " == 2");
console.log(getMin([-1,-2,-3]) + " == -3");
console.log(getMin([10]) + " == 10");
console.log(getMin([]) + " == undefined");

