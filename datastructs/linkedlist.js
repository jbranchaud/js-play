/*
 * linkedlist.js
 *
 * an implementation of the linked list datastructure
 */

/*
 * ListItem constructor
 *
 * this is the constructor for the ListItem object. Given some object, item,
 * this function creates a new ListItem its item as that item and its next
 * set to null.
 */
function ListItem(item) {
    this.item = item;
    this.next = null;
}

/*
 * ListItem.addItem
 *
 * this is a prototype function for ListItem that adds an item to this
 * ListItem. If this ListItem isn't pointing to anything, then a new
 * ListItem is created with item and this.next then points to that new
 * ListItem. If there is already a next, then the new ListItem is injected
 * in between them.
 */
ListItem.prototype.addItem = function(item) {
    if(this.next === null) {
        this.next = new ListItem(item);
    }
    else {
        var newListItem = new ListItem(item);
        newListItem.next = this.next;
        this.next = newListItem;
    }
}

/*
 * ListItem.add
 *
 * this is a prototype function for ListItem that adds a ListItem to this
 * ListItem. If this ListItem isn't pointing to anything, then it now points
 * to the given ListItem. If there is already a next, then the ListItem is
 * injected in between them.
 */
ListItem.prototype.add = function(listItem) {
    if(this.next === null) {
        this.next = listItem;
    }
    else {
        listItem.next = this.next;
        this.next = listItem;
    }
}

/*
 * LinkedList constructor
 *
 * this instantiates a LinkedList object that is completely empty.
 */
function LinkedList() {
    this.first = null;
    this.last = null;
    this.size = 0;
}

/*
 * LinkedList.add: item -> void
 *
 * this is a prototype function for LinkedList that adds an item to the end
 * of the list. If this.last is null, then this.first must also be null, so
 * both are updated to the new ListItem. Otherwise, last is updated to point
 * to the new ListItem and the old last points to the new ListItem as its
 * next.
 */
LinkedList.prototype.add = function(item) {
    var newListItem = new ListItem(item);
    if(this.last === null) {
        this.first = newListItem;
        this.last = newListItem;
    }
    else {
        this.last.add(newListItem);
        this.last = newListItem;
    }
    this.size += 1;
}

/*
 * LinkedList.insert: item, index -> void
 *
 * this is a prototype function for LinkedList that adds an item at the
 * specified position (index) of the linked list. If the index is greater
 * than the size of the list, then it is added to the end of the list.
 */
LinkedList.prototype.insert = function(item, index) {
    var newListItem = new ListItem(item);
    // if the index is 0
    if(index == 0) {
        newListItem.next = this.first;
        this.first = newListItem;
    }
    // if the index is greater than or equal to size
    else if(index >= this.size) {
        this.add(item);
        return;
    }
    // everything else, deal with normally
    else {
        var injectionNode = this.first;
        for(var i = 0; i < index-1; i++) {
            injectionNode = injectionNode.next;
        }
        injectionNode.add(newListItem);
    }
    // increment the size of the list
    this.size += 1;
}
