/*global describe, it */
'use strict';
(function () {
    describe('Stack', function () {
        describe('#Push()', function () {
            it('should initialize the stack with the default values', function() {
                var stack = new Stack();
                // check that the head is null
                assert.equal(stack.head, null);
                // check that the items are size 0
                assert.lengthOf(stack.items, 0);
                // check that the size is 0
                assert.equal(stack.size, 0);
            });

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

        });
    });
})();
