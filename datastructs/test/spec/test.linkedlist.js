/*global describe, it */
'use strict';
(function () {
    describe('LinkedList', function () {
        describe('#LinkedList()', function() {
            it('should initialize the linked list with the default values', function() {
                var list = new LinkedList();
                // check that the first and last are null
                assert.equal(list.first, null);
                assert.equal(list.last, null);
                // check that the size is 0
                assert.equal(list.size, 0);
            });
        });
    });
    describe('ListItem (LinkedList)', function() {
        describe('#ListItem()', function() {
            it('should initialize the list item with the given item', function() {
                var i = 1;
                var listItem = new ListItem(i);
                // check that the item is correctly set
                assert.equal(listItem.item, i);
                // check that the next is null
                assert.equal(listItem.next, null);
            });
        });
    });
})();
