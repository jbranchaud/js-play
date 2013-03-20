/*
 * sorts.js - a variety of sorting algorithms and other functions
 */

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

// testing out getMax()
assert(getMax([1,2,3]) == 3, "using getMax");
assert(getMax([5,2,4]) == 5, "using getMax");
assert(getMax([-1,-2,-3]) == -1, "using getMax");
assert(getMax([10]) == 10);
assert(getMax([]) == undefined);

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

// testing out getMin()
assert(getMin([1,2,3]) == 1);
assert(getMin([5,2,4]) == 2);
assert(getMin([-1,-2,-3]) == -3);
assert(getMin([10]) == 10);
assert(getMin([]) == undefined);

// compareArrays - given two arrays of integers, this function will
// first compare the length of the arrays. If the lengths differ, then
// false is immediately returned, otherwise the function will then
// check the equality of each integer in the array. If the all match,
// then true is returned. If even one does not match, then false is
// returned.
//
// Examples:
// compareArrays([1,2,3],[1,2,3])
// > true
// compareArrays([1,2,3],[1,2,4])
// > false
function compareArrays(arr1, arr2) {
    if(arr1.length != arr2.length) {
        return false;
    }

    for(var i = 0; i < arr1.length; i++) {
        if(arr1[i] != arr2[i]) {
            return false;
        }
    }
    return true;
}

// selectionSort - this function will take an array of integers and
// sort it using the selection sort algorithm. The resulting sorted
// list will be returned.
//
// Pseudocode:
// create a sortedArray that is empty
// while the length of the given array is greater than 0
//  grab the first item in the array and assign to min
//  the minIndex is assigned to 0
//  for each subsequent item in the given array
//      if min is greater than the curr item
//          then min is assigned to be the curr item
//          minIndex is assigned to the index of curr item
//  splice/remove minIndex from the given array
//  push/append the min value onto the sortedArray
// return the sorted array
//
// Example:
// selectionSort([3,2,1])
// > [1,2,3]
function selectionSort(arr) {
    var sortedArr = [];
    while(arr.length > 0) {
        var min = arr[0],
            minIndex = 0;
        for(var i = 1; i < arr.length; i++) {
            if(min > arr[i]) {
                min = arr[i];
                minIndex = i;
            }
        }
        arr.splice(minIndex, 1);
        sortedArr.push(min);
    }
    return sortedArr;
}

// testing out selectionSort()
assert(compareArrays(selectionSort([1,2,3]),[1,2,3]));
assert(compareArrays(selectionSort([3,2,1]),[1,2,3]));
assert(compareArrays(selectionSort([]),[]));
assert(compareArrays(selectionSort([5]),[5]));

// insertionSort - this function sorts a given array based on the
// insertion sort algorithm.
//
// Pseudocode:
//
function insertionSort(arr) {
    for(var i = 1; i < arr.length; i++) {
        var val = arr[i],
            holePos = i;
        while(holePos > 0 && val < arr[holePos - 1]) {
            arr[holePos] = arr[holePos - 1];
            holePos = holePos - 1;
        }
        arr[holePos] = val;
    }
    return arr;
}

// testing out insertionSort()
assert(compareArrays(insertionSort([1,2,3]),[1,2,3]));
assert(compareArrays(insertionSort([3,2,1]),[1,2,3]));
assert(compareArrays(insertionSort([]),[]));
assert(compareArrays(insertionSort([5]),[5]));

// quickSort - this function sorts a given array based on the Quick
// Sort algorithm.
//
// Pseudocode:
// if the length of array is <= 1
//  then return the array
// Splice the arr.length/2 item from the array, put in pivot
// for each remaining item in arr
//  if item is <= pivot then add to less
//  if item is > pivot then add to more
// concatenate quickSort(less), pivot, quickSort(more)
// return the concatenated list
function quickSort(arr) {
    if(arr.length <= 1) {
        return arr;
    }

    var pivot = arr.splice(arr.length/2, 1)[0],
        less = [],
        more = [];
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] <= pivot) {
            less.push(arr[i]);
        }
        else {
            // it is greater
            more.push(arr[i]);
        }
    }
    var sortedArr = quickSort(less).concat(pivot, quickSort(more));
    return sortedArr;
}

// testing out quickSort()
assert(compareArrays(quickSort([]),[]));
assert(compareArrays(quickSort([11]),[11]));
assert(compareArrays(quickSort([9,8]),[8,9]));
assert(compareArrays(quickSort([1,2,3]),[1,2,3]));
assert(compareArrays(quickSort([3,2,1]),[1,2,3]));
assert(compareArrays(quickSort([6,4,5,7,4,2,3,5,7,9,6,4,2,1,2,3,11,12,9,7,13,6]),
            [ 1, 2, 2, 2, 3, 3, 4, 4, 4, 5, 5, 6, 6, 6, 7, 7, 7, 9, 9, 11, 12, 13 ]));

// mergeSort - this function sorts a given array based on the Merge
// Sort algorithm.
//
// Pseudocode:
// if the length of array is <= 1
//  then return the array
// create a list for the left and right side and get the middle value
// which is half the length of the array
// Partition the arr such that:
//  Everything before the middle index goes in left
//  Everything at or after the middle index goes in right
// Call mergeSort on the left array
// Call mergeSort on the right array
// Call merge on the left and right
// Return the resulting merged array
function mergeSort(arr) {
    if(arr.length <= 1) {
        return arr;
    }
    var middle = arr.length/2,
        left = arr.slice(0,middle),
        right = arr.slice(middle,arr.length);
    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left,right);
}

// merge: Array<Integer>:left Array<Integer>:right -> Array<Integer>:result
// this function merges two given arrays for the mergeSort
// function and returns the resulting merged array.
//
// Pseudocode:
// while the length of left > 0 OR length of right > 0
//  if the length of left > 0 AND length of right > 0 then
//      if left[0] <= right[0] then
//          splice the value at left[0]
//          append the spliced value to result
//      else
//          splice the value at right[0]
//          append the spliced value to result
//  else if length of left > 0 then
//      splice the value at left[0]
//      append the spliced value to result
//  else if length of right > 0 then
//      splice the value at right[0]
//      append the spliced value to result
// return result
function merge(left,right) {
    var result = [];
    while(left.length > 0 || right.length > 0) {
        if(left.length > 0 && right.length > 0) {
            if(left[0] <= right[0]) {
                result.push(left.splice(0,1)[0]);
            }
            else {
                result.push(right.splice(0,1)[0]);
            }
        }
        else if(left.length > 0) {
            result.push(left.splice(0,1)[0]);
        }
        else if(right.length > 0) {
            result.push(right.splice(0,1)[0]);
        }
    }
    return result;
}

// testing out mergeSort()
assert(compareArrays(mergeSort([]),[]));
assert(compareArrays(mergeSort([11]),[11]));
assert(compareArrays(mergeSort([9,8]),[8,9]));
assert(compareArrays(mergeSort([1,2,3]),[1,2,3]));
assert(compareArrays(mergeSort([3,2,1]),[1,2,3]));
assert(compareArrays(mergeSort([6,4,5,7,4,2,3,5,7,9,6,4,2,1,2,3,11,12,9,7,13,6]),
            [ 1, 2, 2, 2, 3, 3, 4, 4, 4, 5, 5, 6, 6, 6, 7, 7, 7, 9, 9, 11, 12, 13 ]));

// testing sorting against itself
assert(compareArrays(insertionSort([4,5,9,2,7,1,1,1,6]), selectionSort([4,5,9,2,7,1,1,1,6])));

