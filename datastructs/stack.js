/*
 * stack.js
 *
 * an implementation of a stack datastructure
 *
 * methods:
 * - push - put an element on the top of the stack
 * - pop - remove the top element of the stack
 * - top - get a reference to the top element of the stack
 * - empty - determine if the stack is empty or not
 * - size - get the number of items on the stack
 */

/*
 * constructor
 *
 * creates an empty stack object
 */
function Stack() {
    this.size = 0;
    this.head = null;
    this.items = [];
}

/*
 * push: Object -> void
 *
 * puts the given object onto the top of the stack. This updates the size of
 * the stack, the item that head is pointing to, and the array of items.
 */
Stack.prototype.push = function(item) {
    this.size += 1;
    this.head = item;
    this.items.push(item);
};

/*
 * pop: none -> Object
 *
 * removes the top item from the stack and returns it. This ends up updating
 * the stack, the size of the stack, and what is pointed to by the head.
 */
Stack.prototype.pop = function() {
    var poppedItem = this.items.pop();
    if(poppedItem !== undefined) {
        this.size -= 1;
        this.head = this.items[this.size-1];
    }
    return poppedItem;
}

/*
 * top: none -> Object
 *
 * returns the top item on the stack, but unlike the pop function, it does
 * not modify the stack in any way.
 */
Stack.prototype.top = function() {
    return this.head;
}

/*
 * empty: none -> boolean
 *
 * if the stack is empty, then true is returned, otherwise false is
 * returned.
 */
Stack.prototype.empty = function() {
    return this.size == 0;
}
