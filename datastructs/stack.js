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
