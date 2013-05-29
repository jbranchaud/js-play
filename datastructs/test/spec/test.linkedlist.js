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

        describe('#Add()', function() {
            it('should add the first item to an empty linked list', function() {
                var list = new LinkedList();
                var i = 12;
                list.add(i);
                // check that first and last point to a ListItem with i
                assert.equal(list.first.item, i);
                assert.equal(list.last.item, i);
                // check that the size of the list is now 1
                assert.equal(list.size, 1);
            });
            it('should add the item to a partially populated linked list', function() {
                var list = new LinkedList();
                var i = 13, j = 45;
                list.add(i);
                list.add(j);
                // check that the first contains i
                assert.equal(list.first.item, i);
                // check that the last contains j
                assert.equal(list.last.item, j);
                // check that the size of the list is now 2
                assert.equal(list.size, 2);
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
