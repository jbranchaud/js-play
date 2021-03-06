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

        describe('#Insert()', function() {
            it('should insert the item at index 0 (the beginning of the list)', function() {
                var list = new LinkedList();
                var i = 13, j = 15, k = 17, l = 19, m = 21;
                list.add(i);
                list.add(j);
                list.add(k);
                list.add(l);
                // check that the first item is i
                assert.equal(list.first.item, i);
                // check that the size is 4
                assert.equal(list.size, 4);
                // insert an item at the beginning (0)
                list.insert(m, 0);
                // check that the first item is m
                assert.equal(list.first.item, m);
                // check that the size is 5
                assert.equal(list.size, 5);
            });
            it('should insert the item at the end because of too large index', function() {
                var list = new LinkedList();
                var i = 11, j = 12;
                // insert into an empty list
                list.insert(i, 5);
                // check that the first and last are i
                assert.equal(list.first.item, i);
                assert.equal(list.last.item, i);
                // check that the size is now 1
                assert.equal(list.size, 1);
                // insert into a non empty list beyond size
                list.insert(j, 5);
                // check that the last is j and the first i
                assert.equal(list.first.item, i);
                assert.equal(list.last.item, j);
                // check that the size is now 2
                assert.equal(list.size, 2);
            });
            it('should insert the item at the given index which falls in between some existing items', function() {
                var list = new LinkedList();
                var i = 13, j = 15, k = 17, l = 19, m = 12;
                list.add(i);
                list.add(j);
                list.add(k);
                list.add(l);
                // insert m at the 2nd position
                list.insert(m, 2);
                // check that the list now goes i, j, m, k, l
                var curr = list.first;
                assert.equal(curr.item, i);
                curr = curr.next;
                assert.equal(curr.item, j);
                curr = curr.next;
                assert.equal(curr.item, m);
                curr = curr.next;
                assert.equal(curr.item, k);
                curr = curr.next;
                assert.equal(curr.item, l);
                assert.equal(list.size, 5);
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
        
        describe('#Add()', function() {
            it('should add a ListItem to the end of the current item which is pointing to nothing', function() {
                var someItem = new ListItem(2),
                    newItem = new ListItem(3);
                someItem.add(newItem);
                // check that someItem now points to newItem
                assert(someItem.next === newItem, "someItem points to newItem");
            });
            it('should add a ListItem in between the current item and its next', function() {
                var someItem = new ListItem(2),
                    newItem = new ListItem(3),
                    anotherItem = new ListItem(4);
                someItem.add(newItem);
                // check that someItem now points to newItem
                assert(someItem.next === newItem, "someItem points to newItem");
                // add an item between them (to someItem)
                someItem.add(anotherItem);
                // check that anotherItem is in between someItem and newItem
                assert(someItem.next === anotherItem, "someItem points to anotherItem");
                assert(anotherItem.next === newItem, "anotherItem points to newItem");
            });
        });

        describe('#AddItem()', function() {
            it('should add an item as a new ListItem to the end of the current item which is point to nothing', function() {
                var someItem = new ListItem(2);
                var i = 1;
                someItem.addItem(i);
                // check that someItem now points to an item with value i
                assert.equal(someItem.next.item, i);
            });
            it('should add an item as a new ListItem in between the current item and its next', function() {
                var someItem = new ListItem(44),
                    anotherItem = new ListItem(55);
                var i = 31;
                someItem.add(anotherItem);
                someItem.addItem(i);
                // check that someItem now points to an item with value i
                assert.equal(someItem.next.item, i);
                // check that the new item now points to another item
                assert(someItem.next.next === anotherItem, "someItem's next points to anotherItem");
            });
        });
    });
})();
