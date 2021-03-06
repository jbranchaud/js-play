/*global describe, it */
'use strict';
(function () {
    describe('Stack', function () {
        describe('#Stack()', function() {
            it('should initialize the stack with the default values', function() {
                var stack = new Stack();
                // check that the head is null
                assert.equal(stack.head, null);
                // check that the items are size 0
                assert.lengthOf(stack.items, 0);
                // check that the size is 0
                assert.equal(stack.size, 0);
            });
        });

        describe('#Push()', function () {
            it('should push the given item onto the array of items', function () {
                var stack = new Stack();
                assert.lengthOf(stack.items,0);
                // push an item onto the stack
                stack.push(1);
                assert.equal(stack.items[0],1);
                // push another item onto the stack
                stack.push(2);
                assert.equal(stack.items[1],2);
            });

            it('should increment the size of the stack when an item is pushed on', function() {
                var stack = new Stack();
                assert.equal(stack.size,0);
                // push an item onto the stack
                stack.push(23);
                assert.equal(stack.size, 1);
                // push two more items onto the stack
                stack.push(2);
                stack.push(14);
                assert.equal(stack.size,3);
            });

            it('should update the head item of the stack to what is being pushed on', function() {
                var stack = new Stack();
                assert.equal(stack.head,null)
                // push an item onto the stack
                stack.push(24);
                assert.equal(stack.head, 24);
                // push another item onto the stack
                stack.push(34);
                assert.equal(stack.head, 34);
                // push one more item on
                stack.push(24);
                assert.equal(stack.head, 24);
            });

            it('should have coordination between all the state variables of the stack', function() {
                var stack = new Stack();
                assert.lengthOf(stack.items,stack.size);
                // push an item onto the stack
                stack.push(11);
                assert.lengthOf(stack.items,stack.size);
                assert.equal(stack.items[stack.size-1],stack.head);
            });

        });

        describe('#Pop()', function () {
            it('should pop the head item from the stack', function() {
                var stack = new Stack();
                var i = 1;
                stack.push(i);
                assert.equal(stack.head,i);
                assert.equal(stack.pop(),i);
                assert.lengthOf(stack.items,0);
                assert.lengthOf(stack.items,stack.size);
                assert.equal(stack.head,null);
            });

            it('should not pop anything when the stack is already empty', function() {
                var stack = new Stack();
                assert.lengthOf(stack.items,0);
                assert.equal(stack.pop(), undefined);
                assert.lengthOf(stack.items,0);
                assert.lengthOf(stack.items,stack.size);
                assert.equal(stack.head,null);
            });
        });

        describe('#Top()', function() {
            it('should return the top item from the stack if there are items in the stack', function() {
                var stack = new Stack();
                var i = 22;
                stack.push(i);
                assert.equal(stack.top(),i);
                assert.equal(stack.head,i);
            });

            it('should return null if the stack is empty', function() {
                var stack = new Stack();
                assert.equal(stack.top(), null);
            });
        });

        describe('#Empty()', function() {
            it('should return true when there are no items in the stack', function() {
                var stack = new Stack();
                assert.equal(stack.empty(), true);
                stack.push(2);
                stack.pop();
                assert.equal(stack.empty(), true);
            });

            it('should return false when there are no items in the stack', function() {
                var stack = new Stack();
                stack.push(2);
                assert.equal(stack.empty(), false);
                stack.push(4);
                assert.equal(stack.empty(), false);
                stack.top();
                assert.equal(stack.empty(), false);
                stack.pop();
                assert.equal(stack.empty(). false);
            });
        });
    });
})();
